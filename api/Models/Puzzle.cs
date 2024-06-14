
using System.Collections.Generic;

namespace Intuicode.Models
{
    public class Puzzle
    {
        public string Id { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Dictionary<string, string> StartCode { get; set; }
        public Dictionary<string, string> TestCode { get; set; }
        public List<string> Hints { get; set; }
        public List<string> Tags { get; set; }
    }
}
