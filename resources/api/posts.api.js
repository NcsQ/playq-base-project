"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
exports.api = {
    getAll: {
        path: '/posts',
        method: 'GET',
        expectedStatus: '200',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    getById: {
        path: '/posts/{id}',
        method: 'GET',
        expectedStatus: '200'
    },
    create: {
        path: '/posts',
        method: 'POST',
        expectedStatus: '201',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    update: {
        path: '/posts/1',
        method: 'PUT',
        expectedStatus: '200',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    patch: {
        path: '/posts/1',
        method: 'PATCH',
        expectedStatus: '200',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    delete: {
        path: '/posts/1',
        method: 'DELETE',
        expectedStatus: '200'
    },
    notFound: {
        path: '/posts/99999',
        method: 'GET',
        expectedStatus: '404'
    }
};
