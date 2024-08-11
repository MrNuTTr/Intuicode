using System.Collections.Generic;
using System.Threading.Tasks;
using Intuicode.Models;

namespace Intuicode.Services 
{
    public interface IDatabase 
    {
        public Task<Puzzle> GetPuzzleAsync(string puzzleId);
        public Task<List<Puzzle>> GetPuzzleListAsync(string category = "");
        public Task AddPuzzleAsync(Puzzle puzzle);
        public Task UpdatePuzzleAsync(Puzzle puzzle);
        public Task DeletePuzzleAsync(string id);
    }
}