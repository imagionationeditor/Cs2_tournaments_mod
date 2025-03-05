using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

public class ManagerMod
{
    private static string managerPassword = "mojtaba09981489423";
    private static string adminConfigPath = "ManagerMenu/config.cfg";
    private static string matchNamePath = "ManagerMenu/match_name.cfg";

    public static void Initialize()
    {
        // Register the command
        ServerCommand.RegisterCommand("!manager", OpenManagerMenu);
    }

    private static void OpenManagerMenu(string[] args)
    {
        if (args.Length > 1 && args[1] == managerPassword)
        {
            // Open the manager menu
            PanoramaUI.Open("file://{resources}/scripts/custom/manager_menu.html");
        }
        else
        {
            // Request password
            PanoramaUI.ShowMessageBox("Enter Manager Password", new string[] { "Cancel", "OK" }, PasswordCallback);
        }
    }

    private static void PasswordCallback(string password)
    {
        if (password == managerPassword)
        {
            // Open the manager menu
            PanoramaUI.Open("file://{resources}/scripts/custom/manager_menu.html");
        }
        else
        {
            PanoramaUI.ShowMessageBox("Incorrect Password", new string[] { "OK" });
        }
    }

    public static void CreateAdmin(string username, string password)
    {
        string hashedPassword = HashPassword(password);
        File.AppendAllText(adminConfigPath, $"{username}:{hashedPassword}\n");
    }

    public static bool ValidateAdmin(string username, string password)
    {
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

    public static void ChangeMatchName(string matchName)
    {
        File.WriteAllText(matchNamePath, matchName);
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
}