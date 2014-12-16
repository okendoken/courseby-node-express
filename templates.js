module.exports = {
    layout: function(content){
        return '<head>' +
            '<title>Users Index</title>' +
            '  <meta charset="utf-8">' +
            '  <link href="css/bootstrap.css" rel="stylesheet">' +
            '  <link href="css/styles.css" rel="stylesheet">' +
            '  <script src="js/jquery-2.1.1.js"></script>' +
            '  <script src="js/scripts.js"></script>' +
            '</head>' +
            '<body>' +
            '<div class="container">' +
            '<h1>Welcome to Users Index</h1>' +
            content +
            '</div>' +
            '</body>';
    },

    list: function (users) {
        var html = '<h3>User list</h3>' +
            '<table class="table table-striped"><tr><th>ID</th><th>Username</th><th>Age</th><td></td></tr>';
        users.forEach(function(user){
            html += '<tr>' +
            '<td>' + user.id + '</td>' +
            '<td>' + user.username + '</td>' +
            '<td>' + user.age + '</td>' +
            '<td><a href="delete/' + user.id + '">delete</a></td>' +
            '</tr>'
        });
        html += '</table>' + '<a href="create">Add new User</a>';
        return html;
    },

    add: function (){
        return '<h3>Add New User</h3>' +
            '<form class="form-horizontal" action="add" method="post">' +
            '<div class="form-group">' +
            '  <label for="username">Username</label>' +
            '  <input id="username" name="username" class="form-control" type="text">' +
            '</div>' +
            '<div class="form-group">' +
            '  <label for="password">Password</label>' +
            '  <input id="password" name="password" class="form-control" type="password">' +
            '</div>' +
            '<div class="form-group">' +
            '  <label for="age">Age</label>' +
            '  <input id="age" name="age" class="form-control" type="text">' +
            '</div>' +
            '<button type="submit" class="btn btn-danger">Create</button>' +
            '</form>' +
            '<a href="/">Users List</a>'
    }
};