let maps = []; // Maps will be received from the manager menu
let selectedMode;
let currentTeam = 'A';
let selectedMaps = [];
let bannedMaps = [];
let timer;

function loadMaps() {
    // Receive the list of maps from the manager menu
    callCSharpMethod('PickBanMod.GetMapsFromManager', function(receivedMaps) {
        maps = receivedMaps;
        let mapList = document.getElementById('mapList');
        mapList.innerHTML = '';
        maps.forEach(map => {
            let mapElement = document.createElement('div');
            mapElement.className = 'map';
            mapElement.innerHTML = `<img src="${map.img}" alt="${map.name}"><div class="name">${map.name}</div><div class="status"></div>`;
            mapElement.onclick = () => selectMap(map.name);
            mapList.appendChild(mapElement);
        });
    });
}

function selectMode(mode) {
    selectedMode = mode;
    document.getElementById('modeSelection').style.display = 'none';
    loadMaps();
    startTimer();
}

function selectMap(mapName) {
    if (selectedMaps.includes(mapName) || bannedMaps.includes(mapName)) return;

    switch (selectedMode) {
        case 'bo1':
            handleBo1PickBan(mapName);
            break;
        case 'bo3':
            handleBo3PickBan(mapName);
            break;
        case 'bo5':
            handleBo5PickBan(mapName);
            break;
        case 'bo5ad':
            handleBo5adPickBan(mapName);
            break;
    }

    switchTeam();
    startTimer();
}

function handleBo1PickBan(mapName) {
    if (bannedMaps.length < 1) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team A');
    } else if (bannedMaps.length < 3) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team B');
    } else if (bannedMaps.length < 5) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team A');
    } else if (bannedMaps.length < 6) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team B');
    } else {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Remaining');
        promptSideSelection(mapName, 'Remaining');
    }
}

function handleBo3PickBan(mapName) {
    if (bannedMaps.length < 1) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team A');
    } else if (bannedMaps.length < 2) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team B');
    } else if (selectedMaps.length < 1) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team A');
        promptSideSelection(mapName, 'Team B');
    } else if (selectedMaps.length < 2) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team B');
        promptSideSelection(mapName, 'Team A');
    } else if (bannedMaps.length < 3) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team A');
    } else if (bannedMaps.length < 4) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team B');
    } else {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Decider');
        promptSideSelection(mapName, 'Decider');
    }
}

function handleBo5PickBan(mapName) {
    if (bannedMaps.length < 1) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team A');
    } else if (bannedMaps.length < 2) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team B');
    } else if (selectedMaps.length < 1) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team A');
        promptSideSelection(mapName, 'Team B');
    } else if (selectedMaps.length < 2) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team B');
        promptSideSelection(mapName, 'Team A');
    } else if (selectedMaps.length < 3) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team A');
        promptSideSelection(mapName, 'Team B');
    } else if (selectedMaps.length < 4) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team B');
        promptSideSelection(mapName, 'Team A');
    } else {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Decider');
        promptSideSelection(mapName, 'Decider');
    }
}

function handleBo5adPickBan(mapName) {
    if (bannedMaps.length < 1) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team A');
    } else if (bannedMaps.length < 2) {
        bannedMaps.push(mapName);
        updateMapStatus(mapName, 'banned', 'Team B');
    } else if (selectedMaps.length < 1) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team A');
        promptSideSelection(mapName, 'Team B');
    } else if (selectedMaps.length < 2) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team B');
        promptSideSelection(mapName, 'Team A');
    } else if (selectedMaps.length < 3) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team A');
        promptSideSelection(mapName, 'Team B');
    } else if (selectedMaps.length < 4) {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'picked', 'Team B');
        promptSideSelection(mapName, 'Team A');
    } else {
        selectedMaps.push(mapName);
        updateMapStatus(mapName, 'advantage', 'Advantaged Team');
    }
}

function updateMapStatus(mapName, status, team) {
    let mapElement = Array.from(document.getElementsByClassName('map')).find(el => el.innerText.includes(mapName));
    if (status === 'banned') {
        mapElement.classList.add('banned');
        mapElement.querySelector('.status').innerText = `Banned by ${team}`;
    } else if (status === 'picked') {
        mapElement.classList.add('selected');
        mapElement.querySelector('.status').innerText = `Picked by ${team}`;
    } else if (status === 'advantage') {
        mapElement.classList.add('advantage');
        mapElement.querySelector('.status').innerText = `Advantaged by ${team}`;
    }
}

function promptSideSelection(mapName, team) {
    // Prompt the other team to select the side
    let sideSelection = prompt(`${team}, choose your side for ${mapName}: (CT/T)`);
    updateMapStatus(mapName, sideSelection, team);
}

function switchTeam() {
    currentTeam = currentTeam === 'A' ? 'B' : 'A';
}

function startTimer() {
    let timeLeft = 40;
    document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            switchTeam();
            startTimer();
        }
    }, 1000);
}

function finalizePickBan() {
    // Call the C# method to finalize pick and ban
    callCSharpMethod('PickBanMod.FinalizePickBan', selectedMaps, bannedMaps);
}

function callCSharpMethod(method, callback, ...args) {
    // Assuming there's a bridge function to call C# methods from JavaScript
    CSharpBridge.callMethod(method, args, callback);
}

window.onload = loadMaps;