using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Python.Runtime;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Intuicode.CodeRunner
{
    public class RunCodeFunction
    {
        [FunctionName("RunCode")]
        public async Task<IActionResult> RunCode(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "runcode")] HttpRequest req,
            ILogger log)
        {
            if (PythonEngine.IsInitialized == false) 
            {
                Runtime.PythonDLL = "python311.dll";
                PythonEngine.Initialize();
            }

            string requestBody = string.Empty;
            using (StreamReader streamReader = new StreamReader(req.Body))
            {
                requestBody = await streamReader.ReadToEndAsync();
            }
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            string pythonCode = data.code;
            string codeResult = "";

            using (Py.GIL())
            {
                using (PyModule scope = Py.CreateScope())
                {
                    dynamic io = scope.Import("io");
                    dynamic sys = scope.Import("sys");

                    // Create a StringIO object
                    dynamic stringIO = io.StringIO();

                    // Redirect stdout and stderr
                    sys.stdout = sys.stderr = stringIO;

                    // Run the Python code
                    scope.Exec(pythonCode);

                    // Get the console output
                    codeResult = stringIO.getvalue();

                    // Reset stdout and stderr
                    sys.stdout = sys.__stdout__;
                    sys.stderr = sys.__stderr__;
                }
            }

            var returnResult = new Dictionary<string, string>()
            {
                { "result", codeResult }
            };

            return new OkObjectResult(returnResult);
        }
    }
}
