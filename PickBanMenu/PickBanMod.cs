using System;
using System.Collections.Generic;

public class PickBanMod
{
    private static List<Map> maps = new List<Map>();
    private static List<string> selectedMaps = new List<string>();
    private static List<string> bannedMaps = new List<string>();

    public static void Initialize()
    {
        // Register the commands
        ServerCommand.RegisterCommand("!l", RegisterLeader);
        ServerCommand.RegisterCommand("!rp", ReadyForPickBan);
    }

    private static void RegisterLeader(string[] args)
    {
        // Register the leader
    }

    private static void ReadyForPickBan(string[] args)
    {
        // Check if both leaders are ready then open the pick and ban menu
        PanoramaUI.Open("file://{resources}/scripts/custom/pickban_menu.html");
    }

    public static void GetMapsFromManager(Action<List<Map>> callback)
    {
        // Receive the list of maps from the manager menu
        // Assuming there is a method in the manager menu that returns the list of maps
        maps = ManagerMenu.GetMaps();
        callback(maps);
    }

    public static void FinalizePickBan(string[] selectedMaps, string[] bannedMaps)
    {
        PickBanMod.selectedMaps = new List<string>(selectedMaps);
        PickBanMod.bannedMaps = new List<string>(bannedMaps);
        // Apply the pick and ban logic
        ApplyPickBan();
    }

    private static void ApplyPickBan()
    {
        // Implement the logic to apply pick and ban
        Console.WriteLine("Finalized Pick and Ban:");
        Console.WriteLine("Selected Maps:");
        foreach (var map in selectedMaps)
        {
            Console.WriteLine(map);
        }
        Console.WriteLine("Banned Maps:");
        foreach (var map in bannedMaps)
        {
            Console.WriteLine(map);
        }
    }

    public class Map
    {
        public string Name { get; set; }
        public string Img { get; set; }
    }
}