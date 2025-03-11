function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Call the C# method to validate admin
    callCSharpMethod('AdminMod.ValidateAdmin', username, password, (isValid, adminName) => {
            if (isValid) {
                document.getElementById('loginContainer').style.display = 'none';
                document.getElementById('adminContainer').style.display = 'block';
                document.getElementById('adminName').innerText = adminName;
            } else {
                alert('Invalid username or password');
            }
        });
}

function showTeamManagement() {
    document.getElementById('teamManagement').style.display = 'block';
}

function showMapControl() {
    document.getElementById('mapControl').style.display = 'block';
}

function showTimeoutSettings() {
    document.getElementById('timeoutSettings').style.display = 'block';
}

function showRoundBackups() {
    document.getElementById('roundBackups').style.display = 'block';
    loadBackupList();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function saveTeamNames() {
    var team1 = document.getElementById('team1').value;
    var team2 = document.getElementById('team2').value;

    // Call the C# method to save team names
    callCSharpMethod('AdminMod.SaveTeamNames', team1, team2);
    closeModal('teamManagement');
}

function restartMap() {
    var password = prompt('Enter password to restart map:');
    if (password) {
        callCSharpMethod('AdminMod.RestartMap', password);
        closeModal('mapControl');
    }
}

function pauseGame() {
    callCSharpMethod('AdminMod.PauseGame');
    closeModal('mapControl');
}

function saveTimeoutSettings() {
    var team1Timeouts = document.getElementById('team1Timeouts').value;
    var team2Timeouts = document.getElementById('team2Timeouts').value;
    var timeoutDuration = document.getElementById('timeoutDuration').value;

    // Call the C# method to save timeout settings
    callCSharpMethod('AdminMod.SaveTimeoutSettings', team1Timeouts, team2Timeouts, timeoutDuration);
    closeModal('timeoutSettings');
}

function loadBackupList() {
    callCSharpMethod('AdminMod.GetBackupList', function(backups) {
        var backupList = document.getElementById('backupList');
        backupList.innerHTML = '';
        backups.forEach(function(backup) {
            var listItem = document.createElement('li');
            listItem.innerText = `Round ${backup.round}: ${backup.timestamp}`;
            listItem.onclick = function() {
                var password = prompt('Enter password to restore backup:');
                if (password) {
                    callCSharpMethod('AdminMod.RestoreBackup', backup.round, password);
                }
            };
            backupList.appendChild(listItem);
        });
    });
}

function callCSharpMethod(method, ...args) {
    // Assuming there's a bridge function to call C# methods from JavaScript
    CSharpBridge.callMethod(method, args);
}