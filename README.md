# Cs2 Tournaments Mod

## Overview

The Cs2 Tournaments Mod is designed to streamline the process of organizing and managing tournaments in CS2. This mod supports various match formats including BO1 (Best of 1), BO3 (Best of 3), BO5 (Best of 5), and BO5AD (Best of 5 with Advantage). The mod provides a user-friendly interface for team leaders to pick and ban maps according to the rules set by ESL.

## Features

### Server Configuration
- **Rounds**: Best out of 24 (`mp_maxrounds 24`)
- **Round time**: 1 minute 55 seconds (`mp_roundtime 1.92`)
- **Start money**: $800 (`mp_startmoney 800`)
- **Freeze time**: 15 seconds (`mp_freezetime 15`)
- **Buy time**: 20 seconds (`mp_buytime 20`)
- **Bomb timer**: 40 seconds (`mp_c4timer 40`)
- **Overtime rounds**: Best out of 6 (`mp_overtime_maxrounds 6`)
- **Overtime start money**: $10000 (`mp_overtime_startmoney 10000`, `mp_overtime_enable 1`)
- **Round restart delay**: 5 seconds (`mp_round_restart_delay 5`)
- **Breaks**: 3 - 4 minutes during half time for Challenger level tournaments and above; disabled during overtimes
- **Prohibited items**: None (`mp_items_prohibited ""`)
- **Tick Rate**: 128
- **Server Rates**:
  - `sv_maxrate 0`
  - `sv_minrate 30000`
  - `sv_maxupdaterate 128`
  - `sv_minupdaterate 128`
  - `sv_maxcmdrate 128`
  - `sv_mincmdrate 128`
- **Miscellaneous**:
  - `mp_autokick 0`
  - `mp_tkpunish 0`
  - `sv_matchbackup 1`
  - `mp_backup_round 1`
  - `mp_warmuptime 3000`
  - `tv_enable 1`
  - `tv_delay 90`
  - `tv_autorecord 1`
  - `mp_default_team_winner_t ""`
  - `mp_default_team_winner_ct ""`
  - `sv_cheats 0`
  - `sv_allow_votes 0`

### Commands Visibility
- Commands are to be executed in chat but should not be visible to players.

### Manager Menu
- Command: `!manager`
- The manager menu is password-protected.
- Features:
  - Create and manage admins (store credentials in a config file).
  - Set and change tournament names.
  - Adjust server settings.
  - Modify pick and ban maps.
- Map List:
  - Anubis
  - Inferno
  - Mirage
  - Nuke
  - Dust2
  - Ancient
  - Train
- Built using Panorama UI.

### Admin Menu
- Command: `!admin`
- Admin menu is password-protected with credentials created by the manager.
- Features:
  - Display admin name at the top of the menu.
  - Set team names (visible in HUD).
  - Determine which team starts the pick and ban process.
  - Full map restart (requires password).
  - Pause the game.
  - Set the number and duration of timeouts per team.
  - Round backup with auto-save for each round.
  - Restore a round from backup (requires password).
  - Display "powered by moji.spectre, Instagram: mojtaba_.rezai" at the bottom center of the menu.
- Built using Panorama UI.

### Pick and Ban Menu
- Team leaders register with `!l`.
- Leaders announce readiness with `!rp`, freezing the game and opening the pick and ban menu.
- Leaders select match format: "BO1", "BO3", "BO5", or "BO5AD".
- Pick and Ban Rules:
  - **BO1**:
    1. Team A removes one map.
    2. Team B removes two maps.
    3. Team A removes two maps.
    4. Team B removes one map.
    5. The remaining map is played.
  - **BO3**:
    1. Team A removes one map.
    2. Team B removes one map.
    3. Team A picks one map.
    4. Team B picks one map.
    5. Team A removes one map.
    6. Team B removes one map.
    7. The remaining map is played as a decider.
  - **BO5**:
    1. Team A removes one map.
    2. Team B removes one map.
    3. Team A picks one map.
    4. Team B picks one map.
    5. Team A picks one map.
    6. Team B picks one map.
    7. The remaining map is played as a decider.
  - **BO5AD**:
    1. Team A removes one map.
    2. Team B removes one map.
    3. Team A picks one map.
    4. Team B picks one map.
    5. Team A picks one map.
    6. Team B picks one map.
    7. The remaining map is won by default by the team with advantage.
- Pick and Ban Menu Features:
  - Map list displayed with images.
  - Banned maps are grayed out with the banning team indicated.
  - Picked maps are highlighted in green with the picking team indicated.
  - Side selection displayed at the bottom of the map.
  - 40-second timer for each pick/ban.
  - "Powered by moji.spectre, Instagram: Mojtaba_.rezai" at the bottom.
- After the pick and ban process, the game transitions to the first selected map.
- Leaders use `!ready` to start the match.
- After each map, the game automatically transitions to the next selected map.
- A knife round determines sides for the last map.

### MVP System
- After each map, the player with the most MVPs is displayed for 10 seconds.
- If it's the last map, the player with the most MVPs across all maps is displayed as the overall MVP.

### Note
This mod is still in the early stages of development and may contain bugs and issues. Your feedback and contributions are welcome to help improve the mod.

## Installation

1. Clone the repository to your local machine.
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the directory.
   ```sh
   cd Cs2_tournaments_mod
   ```
3. Ensure you have the required dependencies installed.
4. Deploy the mod to your game server.

## Usage

1. **Leader Registration**: Team leaders use the `!l` command to register themselves.
2. **Readiness Announcement**: Leaders use the `!rp` command to announce their readiness.
3. **Match Format Selection**: Leaders select the match format (BO1, BO3, BO5, BO5AD) via the GUI.
4. **Pick and Ban Process**: Follow the on-screen instructions to pick and ban maps.
5. **Finalization**: Once the pick and ban process is complete, the game will transition to the first selected map.

## Files

- **pickban_menu.html**: The HTML file for the pick and ban menu.
- **pickban_styles.css**: The CSS file for the pick and ban menu.
- **pickban_scripts.js**: The JavaScript file for the pick and ban menu logic.
- **PickBanMod.cs**: The C# mod file for handling the pick and ban logic.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

For any questions or support, please open an issue in the repository or contact the maintainer.
