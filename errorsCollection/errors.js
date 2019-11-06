class ExtendableError extends Error {
    constructor(message) {
        if (new.target === ExtendableError) {
            throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
        }
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.contructor);
    }
}

// 404 Not Found
class NotFound extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('not found');
        } else {
            super(m);
        }
    }
}

// 409 Conflict
class Conflict extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('conflict');
        } else {
            super(m);
        }
    }
}


// 500 Internal Server Error
class InternalServerError extends ExtendableError {
    constructor(m) {
        if (arguments.length === 0) {
            super('internal server error');
        } else {
            super(m);
        }
    }
}

module.exports.NotFound = NotFound;
module.exports.Conflict = Conflict;
module.exports.InternalServerError = InternalServerError;