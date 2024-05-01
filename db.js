const fs = require('fs');

var loadDatabase = (db_connection, schema = { users: [], videos: [] }) => {
    if (!fs.existsSync(db_connection)) {
        fs.writeFileSync(db_connection, JSON.stringify(schema));
    }
    let model = JSON.parse(fs.readFileSync(db_connection, 'utf8'));

    var db = {
        model: model,
        filename: db_connection,
        update: () => {
            fs.writeFileSync(db_connection, JSON.stringify(model));
        },
        addUser: (user) => {
            if (!model.users.find(u => u.username === user.username)) {
                model.users.push(user);
                db.update();
                return true;
            }
            return false;
        },
        getUserByUsername: (username) => {
            return model.users.find(u => u.username === username) || null;
        },
        addVideo: (video) => {
            if (!model.videos.find(v => v.url === video.url)) { 
                model.videos.push(video);
                db.update();
                return true;
            }
            return false;
        },
        getAllVideos: () => {
            return model.videos;
        },
        getVideosByUsername: (username) => {
            
            // Return videos that were uploaded by a specific user
            return model.videos.filter(video => video.username === username);
        }
    };

    return db;
};

module.exports = loadDatabase;