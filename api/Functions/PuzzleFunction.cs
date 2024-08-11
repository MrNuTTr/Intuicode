using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Intuicode.Services;
using Intuicode.Models;
using System.IO;
using Newtonsoft.Json;
using System;

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
            if (string.IsNullOrEmpty(puzzleId))
            {
                return new BadRequestObjectResult("Bad PuzzleId");
            }

            try
            {
                Puzzle result = await _db.GetPuzzleAsync(puzzleId);
                return new OkObjectResult(result);
            }
            catch (Microsoft.Azure.Cosmos.CosmosException ex)
            when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                var error = $"No puzzle found with ID: {puzzleId}";
                return new NotFoundObjectResult(error);
            }
            catch (Exception ex)
            {
                log.LogError($"Unknown error updating Puzzle {puzzleId}", ex.StackTrace);
                throw;
            }
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

        [FunctionName("AddPuzzle")]
        public async Task<IActionResult> AddPuzzle(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "puzzles")] HttpRequest req,
            ILogger log)
        {
            string requestBody = "";
            Puzzle puzzleData = new();
            try 
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                puzzleData = JsonConvert.DeserializeObject<Puzzle>(requestBody);
            }
            catch (Exception)
            {
                return new BadRequestObjectResult("Invalid request body");
            }

            puzzleData.Id = Guid.NewGuid().ToString();

            try
            {
                await _db.AddPuzzleAsync(puzzleData);
            }
            catch (Microsoft.Azure.Cosmos.CosmosException ex) 
            when (ex.StatusCode == System.Net.HttpStatusCode.Conflict)
            {
                var error = $"Puzzle already exists with ID: {puzzleData.Id}";
                log.LogError(error, ex.StackTrace);
                return new ConflictObjectResult(error);
            }
            catch (Exception ex)
            {
                log.LogError($"Unknown error updating Puzzle {puzzleData.Id}", ex.StackTrace);
                throw;
            }

            return new OkObjectResult(puzzleData);
        }

        [FunctionName("UpdatePuzzle")]
        public async Task<IActionResult> UpdatePuzzle(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", "put", Route = "puzzles/{puzzleId}")] HttpRequest req,
        string puzzleId,
        ILogger log)
        {
            string requestBody = "";
            Puzzle puzzleData = new();
            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                puzzleData = JsonConvert.DeserializeObject<Puzzle>(requestBody);
            }
            catch (JsonException)
            {
                return new BadRequestObjectResult("Invalid request body");
            }

            if (puzzleData.Id != puzzleId)
            {
                return new BadRequestObjectResult("Mismatch between URL and body payload");
            }

            try
            {
                await _db.UpdatePuzzleAsync(puzzleData);
            }
            catch (Microsoft.Azure.Cosmos.CosmosException ex)
            when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                var error = $"Puzzle not found with ID: {puzzleId}";
                log.LogError(error, ex.StackTrace);
                return new NotFoundObjectResult(error);
            }
            catch(Exception ex)
            {
                log.LogError($"Unknown error updating Puzzle {puzzleData.Id}", ex.StackTrace);
                throw;
            }

            return new OkObjectResult(puzzleData);
        }

        [FunctionName("DeletePuzzle")]
        public async Task<IActionResult> DeletePuzzle(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "puzzles/{puzzleId}")] HttpRequest req,
        string puzzleId,
        ILogger log)
        {
            try
            {
                await _db.DeletePuzzleAsync(puzzleId);
            }
            catch (Microsoft.Azure.Cosmos.CosmosException ex)
            when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                var error = $"Puzzle not found with ID: {puzzleId}";
                log.LogError(error, ex.StackTrace);
                return new NotFoundObjectResult(error);
            }
            catch (Exception ex)
            {
                log.LogError($"Unknown error deleting Puzzle {puzzleId}", ex.StackTrace);
                throw;
            }

            return new OkResult();
        }
    }
}