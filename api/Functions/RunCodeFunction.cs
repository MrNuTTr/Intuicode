using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;
using System.Net.Http;
using System.Text;

namespace Intuicode.CodeRunner
{
    public class RunCodeFunction
    {
        private string _codeAuthToken = Environment.GetEnvironmentVariable("CODE_RUN_TOKEN");
        private string _pythonRunUrlBase = Environment.GetEnvironmentVariable("PYTHON_RUN_URL_BASE");

        [FunctionName("RunCode")]
        public async Task<IActionResult> RunCode(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "runcode")] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<Dictionary<string, object>>(requestBody);

            string runUrl = "";
            switch (data["language"])
            {
                case "python":
                    runUrl = $"{_pythonRunUrlBase}/run";
                    break;
                default:
                    return new BadRequestObjectResult("Unsupported language");
            }

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("X-Auth-Token", _codeAuthToken);
                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                var response = await client.PostAsync(runUrl, content);
                var apiResponse = await response.Content.ReadAsStringAsync();

                return new OkObjectResult(apiResponse);
            }
        }
    }
}
