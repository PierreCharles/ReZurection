Position = function(x, y) {
    Object.defineProperty(this, 'x', { value: x, writable: true });
    Object.defineProperty(this, 'y', { value: y, writable: true });
};