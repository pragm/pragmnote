var defaultData_typ = function () {

    this.dirObject = {
        "5000000000": {
            "name": "System",
            "username": "System",
            "firstname": "System",
            "lastname": "Boss",
            "email": "system@pragm.de",
            "password": "boss",
            "parent": "4000000000",
            "owner": "5000000000",
            "userRight": "0",
            "content": ["4000000000", "4DELETED00"],
            "share": {},
            "maxStorageScore": 5368709120,
            "inviteKeyArray": [],
            "active": true,
            "lastactive": 0,
            "storageScore": 0
        },
        "5GUESTUSER": {
            "owner": "5GUESTUSER",
            "parent": "4000000000",
            "name": "Guest",
            "username": "Guest",
            "firstname": "Max",
            "lastname": "Mustermann",
            "email": "max.mustermann@gmail.com",
            "password": "Guest",
            "userRight": 3,
            "content": [],
            "share": {},
            "maxStorageScore": 20000000,
            "storageScore": 0,
            "active": true,
            "lastactive": 0
        },
        "4000000000": {
            "name": "root",
            "parent": "5000000000",
            "owner": "5000000000",
            "content": ["5000000000", "5GUESTUSER"],
            "share": {},
            "lastmod": 0
        },
        "4DELETED00": {
            "name": "DELETED",
            "parent": "5000000000",
            "owner": "5000000000",
            "content": [],
            "share": {},
            "lastmod": 0
        }
    }

};


var defaultData = new defaultData_typ();