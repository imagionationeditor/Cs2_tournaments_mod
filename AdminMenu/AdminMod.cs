using System;
using System.IO;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

public class AdminMod
{
    private static string adminConfigPath = "ManagerMenu/config.cfg";
    private static string ads = "powered by moji.spectre\nInstagram: mojtaba_.rezai";

    public static void Initialize()
    {
        // Register the command
        ServerCommand.RegisterCommand("!admin", OpenAdminMenu);
    }

    private static void OpenAdminMenu(string[] args)
    {
        // Request password
        PanoramaUI.ShowMessageBox("Enter Admin Username and Password", new string[] { "Cancel", "OK" }, AdminLoginCallback);
    }

    private static void AdminLoginCallback(string username, string password)
    {
        if (ValidateAdmin(username, password, out string adminName))
        {
            // Open the admin menu with admin name
            PanoramaUI.Open($"file://{resources}/scripts/custom/admin_menu.html?adminName={adminName}");
        }
        else
        {
            PanoramaUI.ShowMessageBox("Invalid Username or Password", new string[] { "OK" });
        }
    }

    public static bool ValidateAdmin(string username, string password, out string adminName)
    {
        adminName = username;
        if (!File.Exists(adminConfigPath))
            return false;

        string[] lines = File.ReadAllLines(adminConfigPath);
        foreach (var line in lines)
        {
            var parts = line.Split(':');
            if (parts.Length == 2 && parts[0] == username && parts[1] == HashPassword(password))
            {
                return true;
            }
        }
        return false;
    }

    public static void SaveTeamNames(string team1, string team2)
    {
        // Save the team names for HUD
    }

    public static void RestartMap(string password)
    {
        if (ValidatePassword(password))
        {
            // Restart the map
        }
    }

    public static void PauseGame()
    {
        // Pause the game
    }

    public static void SaveTimeoutSettings(int team1Timeouts, int team2Timeouts, int timeoutDuration)
    {
        // Save the timeout settings
    }

    public static List<Backup> GetBackupList()
    {
        List<Backup> backups = new List<Backup>();
        // Populate backups list from CS2
        return backups;
    }

    public static void RestoreBackup(int round, string password)
    {
        if (ValidatePassword(password))
        {
            // Restore the backup for the given round
        }
    }

    private static bool ValidatePassword(string password)
    {
        // Validate the password
        return true;
    }

    private static string HashPassword(string password)
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            StringBuilder builder = new StringBuilder();
            foreach (byte b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString();
        }
    }

    public class Backup
    {
        public int round { get; set; }
        public string timestamp { get; set; }
    }
}