function showCreateAdmin() {
    document.getElementById('createAdmin').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function createAdmin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Call the C# method to create admin
    callCSharpMethod('ManagerMod.CreateAdmin', username, password);

    closeModal('createAdmin');
}

function showChangeMatchName() {
    document.getElementById('changeMatchName').style.display = 'block';
}

function changeMatchName() {
    var matchName = document.getElementById('matchName').value;

    // Call the C# method to change match name
    callCSharpMethod('ManagerMod.ChangeMatchName', matchName);

    closeModal('changeMatchName');
}

function callCSharpMethod(method, ...args) {
    // Assuming there's a bridge function to call C# methods from JavaScript
    CSharpBridge.callMethod(method, args);
}