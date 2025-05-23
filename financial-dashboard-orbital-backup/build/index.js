"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = hello;
const world = "Hello, world!";
function hello(who = world) {
    return `Hello, ${who}!`;
}
