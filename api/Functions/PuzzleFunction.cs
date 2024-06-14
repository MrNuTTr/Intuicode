using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Intuicode.Services;
using Intuicode.Models;

namespace Intuicode.Puzzles
{
    public class PuzzleFunction
    {
        private IDatabase _db;

        public PuzzleFunction(IDatabase db)
        {
            _db = db;
        }

        [FunctionName("GetPuzzle")]
        public async Task<IActionResult> GetPuzzle(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "puzzles/{puzzleId}")] HttpRequest req,
            ILogger log,
            string puzzleId)
        {
            Puzzle result = await _db.GetPuzzleAsync(puzzleId);

            return new OkObjectResult(result);
        }


        [FunctionName("GetPuzzles")]
        public async Task<IActionResult> GetPuzzles(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "puzzles")] HttpRequest req,
            ILogger log)
        {
            string category = req.Query["category"];

            List<Puzzle> results = await _db.GetPuzzleListAsync(category);

            return new OkObjectResult(results);
        }
    }
}