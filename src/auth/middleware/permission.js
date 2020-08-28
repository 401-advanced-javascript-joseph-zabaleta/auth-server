'use strict';

const allRoles = {
    read: ['user', 'writer', 'editor', 'admin'],
    create: ['writer', 'editor', 'admin'],
    update: ['editor', 'admin'],
    delete: ['admin'],
};


const permission = (role) => async (req, res, next) => {

    let userPermission = allRoles[role];
    let userRole = req.user.role;

    if (userPermission.includes(userRole)) {
        next();
    } else {
        res.status(401).send('Invalid Permissions');
    }
}

module.exports = permission;
