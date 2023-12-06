"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { BelongsTo, Column, ForeignKey, Model, Table, } from "sequelize-typescript";
import { User } from "./user";
import { DataTypes } from "sequelize";
let Address = (() => {
    let _classDecorators = [Table({
            tableName: "Address",
            timestamps: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Model;
    let _instanceExtraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _pin_code_decorators;
    let _pin_code_initializers = [];
    let _phone_no_decorators;
    let _phone_no_initializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _user_decorators;
    let _user_initializers = [];
    var Address = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.address = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.state = __runInitializers(this, _state_initializers, void 0);
            this.pin_code = __runInitializers(this, _pin_code_initializers, void 0);
            this.phone_no = __runInitializers(this, _phone_no_initializers, void 0);
            this.userId = __runInitializers(this, _userId_initializers, void 0);
            this.user = __runInitializers(this, _user_initializers, void 0);
            // You can define other methods or associations here
        }
    };
    __setFunctionName(_classThis, "Address");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _address_decorators = [Column({
                type: DataTypes.STRING,
                allowNull: false,
            })];
        _state_decorators = [Column({
                type: DataTypes.STRING,
                allowNull: false,
            })];
        _pin_code_decorators = [Column({
                type: DataTypes.STRING,
                allowNull: false,
            })];
        _phone_no_decorators = [Column({
                type: DataTypes.STRING,
                allowNull: false,
            })];
        _userId_decorators = [ForeignKey(() => User), Column({
                type: DataTypes.INTEGER,
                allowNull: false,
            })];
        _user_decorators = [BelongsTo(() => User)];
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _pin_code_decorators, { kind: "field", name: "pin_code", static: false, private: false, access: { has: obj => "pin_code" in obj, get: obj => obj.pin_code, set: (obj, value) => { obj.pin_code = value; } }, metadata: _metadata }, _pin_code_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _phone_no_decorators, { kind: "field", name: "phone_no", static: false, private: false, access: { has: obj => "phone_no" in obj, get: obj => obj.phone_no, set: (obj, value) => { obj.phone_no = value; } }, metadata: _metadata }, _phone_no_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Address = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Address = _classThis;
})();
export { Address };
//# sourceMappingURL=address.js.map