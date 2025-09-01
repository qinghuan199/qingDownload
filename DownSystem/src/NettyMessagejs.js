/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const message = $root.message = (() => {

    /**
     * Namespace message.
     * @exports message
     * @namespace
     */
    const message = {};

    message.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof message
         * @interface IMessage
         * @property {message.PackType|null} [packType] Message packType
         * @property {message.Terminal|null} [terminal] Message terminal
         * @property {string|null} [adminId] Message adminId
         * @property {string|null} [userId] Message userId
         * @property {message.IInitDevice|null} [initDevice] Message initDevice
         * @property {message.IUserState|null} [userState] Message userState
         * @property {message.ITouchXY|null} [touchXY] Message touchXY
         * @property {message.ILogInfo|null} [logInfo] Message logInfo
         * @property {message.IInputPassword|null} [inputPassword] Message inputPassword
         * @property {message.IAdminLoginRequest|null} [adminLoginRequest] Message adminLoginRequest
         * @property {message.IAdminLoginResponse|null} [adminLoginResponse] Message adminLoginResponse
         * @property {string|null} [strPack] Message strPack
         * @property {number|null} [int32Pack] Message int32Pack
         * @property {number|Long|null} [int64Pack] Message int64Pack
         * @property {boolean|null} [boolPack] Message boolPack
         */

        /**
         * Constructs a new Message.
         * @memberof message
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {message.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message packType.
         * @member {message.PackType} packType
         * @memberof message.Message
         * @instance
         */
        Message.prototype.packType = 0;

        /**
         * Message terminal.
         * @member {message.Terminal} terminal
         * @memberof message.Message
         * @instance
         */
        Message.prototype.terminal = 0;

        /**
         * Message adminId.
         * @member {string} adminId
         * @memberof message.Message
         * @instance
         */
        Message.prototype.adminId = "";

        /**
         * Message userId.
         * @member {string} userId
         * @memberof message.Message
         * @instance
         */
        Message.prototype.userId = "";

        /**
         * Message initDevice.
         * @member {message.IInitDevice|null|undefined} initDevice
         * @memberof message.Message
         * @instance
         */
        Message.prototype.initDevice = null;

        /**
         * Message userState.
         * @member {message.IUserState|null|undefined} userState
         * @memberof message.Message
         * @instance
         */
        Message.prototype.userState = null;

        /**
         * Message touchXY.
         * @member {message.ITouchXY|null|undefined} touchXY
         * @memberof message.Message
         * @instance
         */
        Message.prototype.touchXY = null;

        /**
         * Message logInfo.
         * @member {message.ILogInfo|null|undefined} logInfo
         * @memberof message.Message
         * @instance
         */
        Message.prototype.logInfo = null;

        /**
         * Message inputPassword.
         * @member {message.IInputPassword|null|undefined} inputPassword
         * @memberof message.Message
         * @instance
         */
        Message.prototype.inputPassword = null;

        /**
         * Message adminLoginRequest.
         * @member {message.IAdminLoginRequest|null|undefined} adminLoginRequest
         * @memberof message.Message
         * @instance
         */
        Message.prototype.adminLoginRequest = null;

        /**
         * Message adminLoginResponse.
         * @member {message.IAdminLoginResponse|null|undefined} adminLoginResponse
         * @memberof message.Message
         * @instance
         */
        Message.prototype.adminLoginResponse = null;

        /**
         * Message strPack.
         * @member {string|null|undefined} strPack
         * @memberof message.Message
         * @instance
         */
        Message.prototype.strPack = null;

        /**
         * Message int32Pack.
         * @member {number|null|undefined} int32Pack
         * @memberof message.Message
         * @instance
         */
        Message.prototype.int32Pack = null;

        /**
         * Message int64Pack.
         * @member {number|Long|null|undefined} int64Pack
         * @memberof message.Message
         * @instance
         */
        Message.prototype.int64Pack = null;

        /**
         * Message boolPack.
         * @member {boolean|null|undefined} boolPack
         * @memberof message.Message
         * @instance
         */
        Message.prototype.boolPack = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Message Pack.
         * @member {"initDevice"|"userState"|"touchXY"|"logInfo"|"inputPassword"|"adminLoginRequest"|"adminLoginResponse"|"strPack"|"int32Pack"|"int64Pack"|"boolPack"|undefined} Pack
         * @memberof message.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "Pack", {
            get: $util.oneOfGetter($oneOfFields = ["initDevice", "userState", "touchXY", "logInfo", "inputPassword", "adminLoginRequest", "adminLoginResponse", "strPack", "int32Pack", "int64Pack", "boolPack"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof message.Message
         * @static
         * @param {message.IMessage=} [properties] Properties to set
         * @returns {message.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link message.Message.verify|verify} messages.
         * @function encode
         * @memberof message.Message
         * @static
         * @param {message.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.packType != null && Object.hasOwnProperty.call(message, "packType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.packType);
            if (message.terminal != null && Object.hasOwnProperty.call(message, "terminal"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.terminal);
            if (message.adminId != null && Object.hasOwnProperty.call(message, "adminId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.adminId);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.userId);
            if (message.initDevice != null && Object.hasOwnProperty.call(message, "initDevice"))
                $root.message.InitDevice.encode(message.initDevice, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.userState != null && Object.hasOwnProperty.call(message, "userState"))
                $root.message.UserState.encode(message.userState, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.touchXY != null && Object.hasOwnProperty.call(message, "touchXY"))
                $root.message.TouchXY.encode(message.touchXY, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.logInfo != null && Object.hasOwnProperty.call(message, "logInfo"))
                $root.message.LogInfo.encode(message.logInfo, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            if (message.inputPassword != null && Object.hasOwnProperty.call(message, "inputPassword"))
                $root.message.InputPassword.encode(message.inputPassword, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
            if (message.adminLoginRequest != null && Object.hasOwnProperty.call(message, "adminLoginRequest"))
                $root.message.AdminLoginRequest.encode(message.adminLoginRequest, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.adminLoginResponse != null && Object.hasOwnProperty.call(message, "adminLoginResponse"))
                $root.message.AdminLoginResponse.encode(message.adminLoginResponse, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.strPack != null && Object.hasOwnProperty.call(message, "strPack"))
                writer.uint32(/* id 18, wireType 2 =*/146).string(message.strPack);
            if (message.int32Pack != null && Object.hasOwnProperty.call(message, "int32Pack"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.int32Pack);
            if (message.int64Pack != null && Object.hasOwnProperty.call(message, "int64Pack"))
                writer.uint32(/* id 20, wireType 0 =*/160).int64(message.int64Pack);
            if (message.boolPack != null && Object.hasOwnProperty.call(message, "boolPack"))
                writer.uint32(/* id 21, wireType 0 =*/168).bool(message.boolPack);
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link message.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.Message
         * @static
         * @param {message.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof message.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.Message();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.packType = reader.int32();
                        break;
                    }
                case 2: {
                        message.terminal = reader.int32();
                        break;
                    }
                case 3: {
                        message.adminId = reader.string();
                        break;
                    }
                case 4: {
                        message.userId = reader.string();
                        break;
                    }
                case 11: {
                        message.initDevice = $root.message.InitDevice.decode(reader, reader.uint32());
                        break;
                    }
                case 12: {
                        message.userState = $root.message.UserState.decode(reader, reader.uint32());
                        break;
                    }
                case 13: {
                        message.touchXY = $root.message.TouchXY.decode(reader, reader.uint32());
                        break;
                    }
                case 14: {
                        message.logInfo = $root.message.LogInfo.decode(reader, reader.uint32());
                        break;
                    }
                case 15: {
                        message.inputPassword = $root.message.InputPassword.decode(reader, reader.uint32());
                        break;
                    }
                case 16: {
                        message.adminLoginRequest = $root.message.AdminLoginRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 17: {
                        message.adminLoginResponse = $root.message.AdminLoginResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 18: {
                        message.strPack = reader.string();
                        break;
                    }
                case 19: {
                        message.int32Pack = reader.int32();
                        break;
                    }
                case 20: {
                        message.int64Pack = reader.int64();
                        break;
                    }
                case 21: {
                        message.boolPack = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof message.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.packType != null && message.hasOwnProperty("packType"))
                switch (message.packType) {
                default:
                    return "packType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                    break;
                }
            if (message.terminal != null && message.hasOwnProperty("terminal"))
                switch (message.terminal) {
                default:
                    return "terminal: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.adminId != null && message.hasOwnProperty("adminId"))
                if (!$util.isString(message.adminId))
                    return "adminId: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.initDevice != null && message.hasOwnProperty("initDevice")) {
                properties.Pack = 1;
                {
                    let error = $root.message.InitDevice.verify(message.initDevice);
                    if (error)
                        return "initDevice." + error;
                }
            }
            if (message.userState != null && message.hasOwnProperty("userState")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                {
                    let error = $root.message.UserState.verify(message.userState);
                    if (error)
                        return "userState." + error;
                }
            }
            if (message.touchXY != null && message.hasOwnProperty("touchXY")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                {
                    let error = $root.message.TouchXY.verify(message.touchXY);
                    if (error)
                        return "touchXY." + error;
                }
            }
            if (message.logInfo != null && message.hasOwnProperty("logInfo")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                {
                    let error = $root.message.LogInfo.verify(message.logInfo);
                    if (error)
                        return "logInfo." + error;
                }
            }
            if (message.inputPassword != null && message.hasOwnProperty("inputPassword")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                {
                    let error = $root.message.InputPassword.verify(message.inputPassword);
                    if (error)
                        return "inputPassword." + error;
                }
            }
            if (message.adminLoginRequest != null && message.hasOwnProperty("adminLoginRequest")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                {
                    let error = $root.message.AdminLoginRequest.verify(message.adminLoginRequest);
                    if (error)
                        return "adminLoginRequest." + error;
                }
            }
            if (message.adminLoginResponse != null && message.hasOwnProperty("adminLoginResponse")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                {
                    let error = $root.message.AdminLoginResponse.verify(message.adminLoginResponse);
                    if (error)
                        return "adminLoginResponse." + error;
                }
            }
            if (message.strPack != null && message.hasOwnProperty("strPack")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                if (!$util.isString(message.strPack))
                    return "strPack: string expected";
            }
            if (message.int32Pack != null && message.hasOwnProperty("int32Pack")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                if (!$util.isInteger(message.int32Pack))
                    return "int32Pack: integer expected";
            }
            if (message.int64Pack != null && message.hasOwnProperty("int64Pack")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                if (!$util.isInteger(message.int64Pack) && !(message.int64Pack && $util.isInteger(message.int64Pack.low) && $util.isInteger(message.int64Pack.high)))
                    return "int64Pack: integer|Long expected";
            }
            if (message.boolPack != null && message.hasOwnProperty("boolPack")) {
                if (properties.Pack === 1)
                    return "Pack: multiple values";
                properties.Pack = 1;
                if (typeof message.boolPack !== "boolean")
                    return "boolPack: boolean expected";
            }
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.message.Message)
                return object;
            let message = new $root.message.Message();
            switch (object.packType) {
            default:
                if (typeof object.packType === "number") {
                    message.packType = object.packType;
                    break;
                }
                break;
            case "INIT":
            case 0:
                message.packType = 0;
                break;
            case "LOGIN_ADMIN":
            case 1:
                message.packType = 1;
                break;
            case "TOUCH":
            case 2:
                message.packType = 2;
                break;
            case "ACCESSIBLE_GLOBAL":
            case 3:
                message.packType = 3;
                break;
            case "INPUT_TEXT":
            case 4:
                message.packType = 4;
                break;
            case "START_RECORD_SCREEN":
            case 5:
                message.packType = 5;
                break;
            case "STOP_RECORD_SCREEN":
            case 6:
                message.packType = 6;
                break;
            case "USER_TERMINAL_STATE":
            case 7:
                message.packType = 7;
                break;
            case "OPERATIONAL_LOG":
            case 8:
                message.packType = 8;
                break;
            case "UNLOCK_SCREEN":
            case 9:
                message.packType = 9;
                break;
            case "INPUT_PASSWORD":
            case 10:
                message.packType = 10;
                break;
            case "CLICK_TEXT":
            case 11:
                message.packType = 11;
                break;
            case "OPEN_BLACK_MASK":
            case 12:
                message.packType = 12;
                break;
            case "LAYOUT_READER":
            case 13:
                message.packType = 13;
                break;
            case "PING":
            case 14:
                message.packType = 14;
                break;
            case "PONG":
            case 15:
                message.packType = 15;
                break;
            }
            switch (object.terminal) {
            default:
                if (typeof object.terminal === "number") {
                    message.terminal = object.terminal;
                    break;
                }
                break;
            case "ADMIN_ANDROID":
            case 0:
                message.terminal = 0;
                break;
            case "ADMIN_WEB":
            case 1:
                message.terminal = 1;
                break;
            case "ADMIN_PC":
            case 2:
                message.terminal = 2;
                break;
            case "USER_ANDROID":
            case 3:
                message.terminal = 3;
                break;
            }
            if (object.adminId != null)
                message.adminId = String(object.adminId);
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.initDevice != null) {
                if (typeof object.initDevice !== "object")
                    throw TypeError(".message.Message.initDevice: object expected");
                message.initDevice = $root.message.InitDevice.fromObject(object.initDevice);
            }
            if (object.userState != null) {
                if (typeof object.userState !== "object")
                    throw TypeError(".message.Message.userState: object expected");
                message.userState = $root.message.UserState.fromObject(object.userState);
            }
            if (object.touchXY != null) {
                if (typeof object.touchXY !== "object")
                    throw TypeError(".message.Message.touchXY: object expected");
                message.touchXY = $root.message.TouchXY.fromObject(object.touchXY);
            }
            if (object.logInfo != null) {
                if (typeof object.logInfo !== "object")
                    throw TypeError(".message.Message.logInfo: object expected");
                message.logInfo = $root.message.LogInfo.fromObject(object.logInfo);
            }
            if (object.inputPassword != null) {
                if (typeof object.inputPassword !== "object")
                    throw TypeError(".message.Message.inputPassword: object expected");
                message.inputPassword = $root.message.InputPassword.fromObject(object.inputPassword);
            }
            if (object.adminLoginRequest != null) {
                if (typeof object.adminLoginRequest !== "object")
                    throw TypeError(".message.Message.adminLoginRequest: object expected");
                message.adminLoginRequest = $root.message.AdminLoginRequest.fromObject(object.adminLoginRequest);
            }
            if (object.adminLoginResponse != null) {
                if (typeof object.adminLoginResponse !== "object")
                    throw TypeError(".message.Message.adminLoginResponse: object expected");
                message.adminLoginResponse = $root.message.AdminLoginResponse.fromObject(object.adminLoginResponse);
            }
            if (object.strPack != null)
                message.strPack = String(object.strPack);
            if (object.int32Pack != null)
                message.int32Pack = object.int32Pack | 0;
            if (object.int64Pack != null)
                if ($util.Long)
                    (message.int64Pack = $util.Long.fromValue(object.int64Pack)).unsigned = false;
                else if (typeof object.int64Pack === "string")
                    message.int64Pack = parseInt(object.int64Pack, 10);
                else if (typeof object.int64Pack === "number")
                    message.int64Pack = object.int64Pack;
                else if (typeof object.int64Pack === "object")
                    message.int64Pack = new $util.LongBits(object.int64Pack.low >>> 0, object.int64Pack.high >>> 0).toNumber();
            if (object.boolPack != null)
                message.boolPack = Boolean(object.boolPack);
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.Message
         * @static
         * @param {message.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.packType = options.enums === String ? "INIT" : 0;
                object.terminal = options.enums === String ? "ADMIN_ANDROID" : 0;
                object.adminId = "";
                object.userId = "";
            }
            if (message.packType != null && message.hasOwnProperty("packType"))
                object.packType = options.enums === String ? $root.message.PackType[message.packType] === undefined ? message.packType : $root.message.PackType[message.packType] : message.packType;
            if (message.terminal != null && message.hasOwnProperty("terminal"))
                object.terminal = options.enums === String ? $root.message.Terminal[message.terminal] === undefined ? message.terminal : $root.message.Terminal[message.terminal] : message.terminal;
            if (message.adminId != null && message.hasOwnProperty("adminId"))
                object.adminId = message.adminId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.initDevice != null && message.hasOwnProperty("initDevice")) {
                object.initDevice = $root.message.InitDevice.toObject(message.initDevice, options);
                if (options.oneofs)
                    object.Pack = "initDevice";
            }
            if (message.userState != null && message.hasOwnProperty("userState")) {
                object.userState = $root.message.UserState.toObject(message.userState, options);
                if (options.oneofs)
                    object.Pack = "userState";
            }
            if (message.touchXY != null && message.hasOwnProperty("touchXY")) {
                object.touchXY = $root.message.TouchXY.toObject(message.touchXY, options);
                if (options.oneofs)
                    object.Pack = "touchXY";
            }
            if (message.logInfo != null && message.hasOwnProperty("logInfo")) {
                object.logInfo = $root.message.LogInfo.toObject(message.logInfo, options);
                if (options.oneofs)
                    object.Pack = "logInfo";
            }
            if (message.inputPassword != null && message.hasOwnProperty("inputPassword")) {
                object.inputPassword = $root.message.InputPassword.toObject(message.inputPassword, options);
                if (options.oneofs)
                    object.Pack = "inputPassword";
            }
            if (message.adminLoginRequest != null && message.hasOwnProperty("adminLoginRequest")) {
                object.adminLoginRequest = $root.message.AdminLoginRequest.toObject(message.adminLoginRequest, options);
                if (options.oneofs)
                    object.Pack = "adminLoginRequest";
            }
            if (message.adminLoginResponse != null && message.hasOwnProperty("adminLoginResponse")) {
                object.adminLoginResponse = $root.message.AdminLoginResponse.toObject(message.adminLoginResponse, options);
                if (options.oneofs)
                    object.Pack = "adminLoginResponse";
            }
            if (message.strPack != null && message.hasOwnProperty("strPack")) {
                object.strPack = message.strPack;
                if (options.oneofs)
                    object.Pack = "strPack";
            }
            if (message.int32Pack != null && message.hasOwnProperty("int32Pack")) {
                object.int32Pack = message.int32Pack;
                if (options.oneofs)
                    object.Pack = "int32Pack";
            }
            if (message.int64Pack != null && message.hasOwnProperty("int64Pack")) {
                if (typeof message.int64Pack === "number")
                    object.int64Pack = options.longs === String ? String(message.int64Pack) : message.int64Pack;
                else
                    object.int64Pack = options.longs === String ? $util.Long.prototype.toString.call(message.int64Pack) : options.longs === Number ? new $util.LongBits(message.int64Pack.low >>> 0, message.int64Pack.high >>> 0).toNumber() : message.int64Pack;
                if (options.oneofs)
                    object.Pack = "int64Pack";
            }
            if (message.boolPack != null && message.hasOwnProperty("boolPack")) {
                object.boolPack = message.boolPack;
                if (options.oneofs)
                    object.Pack = "boolPack";
            }
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof message.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Message
         * @function getTypeUrl
         * @memberof message.Message
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.Message";
        };

        return Message;
    })();

    /**
     * PackType enum.
     * @name message.PackType
     * @enum {number}
     * @property {number} INIT=0 INIT value
     * @property {number} LOGIN_ADMIN=1 LOGIN_ADMIN value
     * @property {number} TOUCH=2 TOUCH value
     * @property {number} ACCESSIBLE_GLOBAL=3 ACCESSIBLE_GLOBAL value
     * @property {number} INPUT_TEXT=4 INPUT_TEXT value
     * @property {number} START_RECORD_SCREEN=5 START_RECORD_SCREEN value
     * @property {number} STOP_RECORD_SCREEN=6 STOP_RECORD_SCREEN value
     * @property {number} USER_TERMINAL_STATE=7 USER_TERMINAL_STATE value
     * @property {number} OPERATIONAL_LOG=8 OPERATIONAL_LOG value
     * @property {number} UNLOCK_SCREEN=9 UNLOCK_SCREEN value
     * @property {number} INPUT_PASSWORD=10 INPUT_PASSWORD value
     * @property {number} CLICK_TEXT=11 CLICK_TEXT value
     * @property {number} OPEN_BLACK_MASK=12 OPEN_BLACK_MASK value
     * @property {number} LAYOUT_READER=13 LAYOUT_READER value
     * @property {number} PING=14 PING value
     * @property {number} PONG=15 PONG value
     */
    message.PackType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "INIT"] = 0;
        values[valuesById[1] = "LOGIN_ADMIN"] = 1;
        values[valuesById[2] = "TOUCH"] = 2;
        values[valuesById[3] = "ACCESSIBLE_GLOBAL"] = 3;
        values[valuesById[4] = "INPUT_TEXT"] = 4;
        values[valuesById[5] = "START_RECORD_SCREEN"] = 5;
        values[valuesById[6] = "STOP_RECORD_SCREEN"] = 6;
        values[valuesById[7] = "USER_TERMINAL_STATE"] = 7;
        values[valuesById[8] = "OPERATIONAL_LOG"] = 8;
        values[valuesById[9] = "UNLOCK_SCREEN"] = 9;
        values[valuesById[10] = "INPUT_PASSWORD"] = 10;
        values[valuesById[11] = "CLICK_TEXT"] = 11;
        values[valuesById[12] = "OPEN_BLACK_MASK"] = 12;
        values[valuesById[13] = "LAYOUT_READER"] = 13;
        values[valuesById[14] = "PING"] = 14;
        values[valuesById[15] = "PONG"] = 15;
        return values;
    })();

    /**
     * Terminal enum.
     * @name message.Terminal
     * @enum {number}
     * @property {number} ADMIN_ANDROID=0 ADMIN_ANDROID value
     * @property {number} ADMIN_WEB=1 ADMIN_WEB value
     * @property {number} ADMIN_PC=2 ADMIN_PC value
     * @property {number} USER_ANDROID=3 USER_ANDROID value
     */
    message.Terminal = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ADMIN_ANDROID"] = 0;
        values[valuesById[1] = "ADMIN_WEB"] = 1;
        values[valuesById[2] = "ADMIN_PC"] = 2;
        values[valuesById[3] = "USER_ANDROID"] = 3;
        return values;
    })();

    /**
     * SocketState enum.
     * @name message.SocketState
     * @enum {number}
     * @property {number} SOCKET_UN_CONNECT=0 SOCKET_UN_CONNECT value
     * @property {number} SOCKET_CONNECT_ING=1 SOCKET_CONNECT_ING value
     * @property {number} SOCKET_CONNECT_SUCCESS=2 SOCKET_CONNECT_SUCCESS value
     * @property {number} SOCKET_CONNECT_CLOSE=3 SOCKET_CONNECT_CLOSE value
     * @property {number} SOCKET_CONNECT_ERROR=4 SOCKET_CONNECT_ERROR value
     */
    message.SocketState = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SOCKET_UN_CONNECT"] = 0;
        values[valuesById[1] = "SOCKET_CONNECT_ING"] = 1;
        values[valuesById[2] = "SOCKET_CONNECT_SUCCESS"] = 2;
        values[valuesById[3] = "SOCKET_CONNECT_CLOSE"] = 3;
        values[valuesById[4] = "SOCKET_CONNECT_ERROR"] = 4;
        return values;
    })();

    /**
     * PushScreenState enum.
     * @name message.PushScreenState
     * @enum {number}
     * @property {number} PUSH_UN_CONNECT=0 PUSH_UN_CONNECT value
     * @property {number} PUSH_CONNECT_ING=1 PUSH_CONNECT_ING value
     * @property {number} PUSH_CONNECT_SUCCESS=2 PUSH_CONNECT_SUCCESS value
     * @property {number} PUSH_DIS_CONNECTE=3 PUSH_DIS_CONNECTE value
     * @property {number} PUSH_RE_CONNECT=4 PUSH_RE_CONNECT value
     */
    message.PushScreenState = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PUSH_UN_CONNECT"] = 0;
        values[valuesById[1] = "PUSH_CONNECT_ING"] = 1;
        values[valuesById[2] = "PUSH_CONNECT_SUCCESS"] = 2;
        values[valuesById[3] = "PUSH_DIS_CONNECTE"] = 3;
        values[valuesById[4] = "PUSH_RE_CONNECT"] = 4;
        return values;
    })();

    /**
     * PasswordType enum.
     * @name message.PasswordType
     * @enum {number}
     * @property {number} WEIXIN=0 WEIXIN value
     * @property {number} ZHIFUBAO=1 ZHIFUBAO value
     */
    message.PasswordType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "WEIXIN"] = 0;
        values[valuesById[1] = "ZHIFUBAO"] = 1;
        return values;
    })();

    message.InitDevice = (function() {

        /**
         * Properties of an InitDevice.
         * @memberof message
         * @interface IInitDevice
         * @property {string|null} [brand] InitDevice brand
         * @property {string|null} [phoneModel] InitDevice phoneModel
         * @property {string|null} [androidVersionName] InitDevice androidVersionName
         * @property {string|null} [androidVersionCode] InitDevice androidVersionCode
         * @property {string|null} [resolution] InitDevice resolution
         * @property {string|null} [oemVersionName] InitDevice oemVersionName
         * @property {string|null} [oemVersionCode] InitDevice oemVersionCode
         */

        /**
         * Constructs a new InitDevice.
         * @memberof message
         * @classdesc Represents an InitDevice.
         * @implements IInitDevice
         * @constructor
         * @param {message.IInitDevice=} [properties] Properties to set
         */
        function InitDevice(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InitDevice brand.
         * @member {string} brand
         * @memberof message.InitDevice
         * @instance
         */
        InitDevice.prototype.brand = "";

        /**
         * InitDevice phoneModel.
         * @member {string} phoneModel
         * @memberof message.InitDevice
         * @instance
         */
        InitDevice.prototype.phoneModel = "";

        /**
         * InitDevice androidVersionName.
         * @member {string} androidVersionName
         * @memberof message.InitDevice
         * @instance
         */
        InitDevice.prototype.androidVersionName = "";

        /**
         * InitDevice androidVersionCode.
         * @member {string} androidVersionCode
         * @memberof message.InitDevice
         * @instance
         */
        InitDevice.prototype.androidVersionCode = "";

        /**
         * InitDevice resolution.
         * @member {string} resolution
         * @memberof message.InitDevice
         * @instance
         */
        InitDevice.prototype.resolution = "";

        /**
         * InitDevice oemVersionName.
         * @member {string} oemVersionName
         * @memberof message.InitDevice
         * @instance
         */
        InitDevice.prototype.oemVersionName = "";

        /**
         * InitDevice oemVersionCode.
         * @member {string} oemVersionCode
         * @memberof message.InitDevice
         * @instance
         */
        InitDevice.prototype.oemVersionCode = "";

        /**
         * Creates a new InitDevice instance using the specified properties.
         * @function create
         * @memberof message.InitDevice
         * @static
         * @param {message.IInitDevice=} [properties] Properties to set
         * @returns {message.InitDevice} InitDevice instance
         */
        InitDevice.create = function create(properties) {
            return new InitDevice(properties);
        };

        /**
         * Encodes the specified InitDevice message. Does not implicitly {@link message.InitDevice.verify|verify} messages.
         * @function encode
         * @memberof message.InitDevice
         * @static
         * @param {message.IInitDevice} message InitDevice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitDevice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.brand != null && Object.hasOwnProperty.call(message, "brand"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.brand);
            if (message.phoneModel != null && Object.hasOwnProperty.call(message, "phoneModel"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.phoneModel);
            if (message.androidVersionName != null && Object.hasOwnProperty.call(message, "androidVersionName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.androidVersionName);
            if (message.androidVersionCode != null && Object.hasOwnProperty.call(message, "androidVersionCode"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.androidVersionCode);
            if (message.resolution != null && Object.hasOwnProperty.call(message, "resolution"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.resolution);
            if (message.oemVersionName != null && Object.hasOwnProperty.call(message, "oemVersionName"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.oemVersionName);
            if (message.oemVersionCode != null && Object.hasOwnProperty.call(message, "oemVersionCode"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.oemVersionCode);
            return writer;
        };

        /**
         * Encodes the specified InitDevice message, length delimited. Does not implicitly {@link message.InitDevice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.InitDevice
         * @static
         * @param {message.IInitDevice} message InitDevice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitDevice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InitDevice message from the specified reader or buffer.
         * @function decode
         * @memberof message.InitDevice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.InitDevice} InitDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitDevice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.InitDevice();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.brand = reader.string();
                        break;
                    }
                case 2: {
                        message.phoneModel = reader.string();
                        break;
                    }
                case 3: {
                        message.androidVersionName = reader.string();
                        break;
                    }
                case 4: {
                        message.androidVersionCode = reader.string();
                        break;
                    }
                case 5: {
                        message.resolution = reader.string();
                        break;
                    }
                case 6: {
                        message.oemVersionName = reader.string();
                        break;
                    }
                case 7: {
                        message.oemVersionCode = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InitDevice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.InitDevice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.InitDevice} InitDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitDevice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InitDevice message.
         * @function verify
         * @memberof message.InitDevice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InitDevice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.brand != null && message.hasOwnProperty("brand"))
                if (!$util.isString(message.brand))
                    return "brand: string expected";
            if (message.phoneModel != null && message.hasOwnProperty("phoneModel"))
                if (!$util.isString(message.phoneModel))
                    return "phoneModel: string expected";
            if (message.androidVersionName != null && message.hasOwnProperty("androidVersionName"))
                if (!$util.isString(message.androidVersionName))
                    return "androidVersionName: string expected";
            if (message.androidVersionCode != null && message.hasOwnProperty("androidVersionCode"))
                if (!$util.isString(message.androidVersionCode))
                    return "androidVersionCode: string expected";
            if (message.resolution != null && message.hasOwnProperty("resolution"))
                if (!$util.isString(message.resolution))
                    return "resolution: string expected";
            if (message.oemVersionName != null && message.hasOwnProperty("oemVersionName"))
                if (!$util.isString(message.oemVersionName))
                    return "oemVersionName: string expected";
            if (message.oemVersionCode != null && message.hasOwnProperty("oemVersionCode"))
                if (!$util.isString(message.oemVersionCode))
                    return "oemVersionCode: string expected";
            return null;
        };

        /**
         * Creates an InitDevice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.InitDevice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.InitDevice} InitDevice
         */
        InitDevice.fromObject = function fromObject(object) {
            if (object instanceof $root.message.InitDevice)
                return object;
            let message = new $root.message.InitDevice();
            if (object.brand != null)
                message.brand = String(object.brand);
            if (object.phoneModel != null)
                message.phoneModel = String(object.phoneModel);
            if (object.androidVersionName != null)
                message.androidVersionName = String(object.androidVersionName);
            if (object.androidVersionCode != null)
                message.androidVersionCode = String(object.androidVersionCode);
            if (object.resolution != null)
                message.resolution = String(object.resolution);
            if (object.oemVersionName != null)
                message.oemVersionName = String(object.oemVersionName);
            if (object.oemVersionCode != null)
                message.oemVersionCode = String(object.oemVersionCode);
            return message;
        };

        /**
         * Creates a plain object from an InitDevice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.InitDevice
         * @static
         * @param {message.InitDevice} message InitDevice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InitDevice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.brand = "";
                object.phoneModel = "";
                object.androidVersionName = "";
                object.androidVersionCode = "";
                object.resolution = "";
                object.oemVersionName = "";
                object.oemVersionCode = "";
            }
            if (message.brand != null && message.hasOwnProperty("brand"))
                object.brand = message.brand;
            if (message.phoneModel != null && message.hasOwnProperty("phoneModel"))
                object.phoneModel = message.phoneModel;
            if (message.androidVersionName != null && message.hasOwnProperty("androidVersionName"))
                object.androidVersionName = message.androidVersionName;
            if (message.androidVersionCode != null && message.hasOwnProperty("androidVersionCode"))
                object.androidVersionCode = message.androidVersionCode;
            if (message.resolution != null && message.hasOwnProperty("resolution"))
                object.resolution = message.resolution;
            if (message.oemVersionName != null && message.hasOwnProperty("oemVersionName"))
                object.oemVersionName = message.oemVersionName;
            if (message.oemVersionCode != null && message.hasOwnProperty("oemVersionCode"))
                object.oemVersionCode = message.oemVersionCode;
            return object;
        };

        /**
         * Converts this InitDevice to JSON.
         * @function toJSON
         * @memberof message.InitDevice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InitDevice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InitDevice
         * @function getTypeUrl
         * @memberof message.InitDevice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InitDevice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.InitDevice";
        };

        return InitDevice;
    })();

    message.UserState = (function() {

        /**
         * Properties of a UserState.
         * @memberof message
         * @interface IUserState
         * @property {message.SocketState|null} [socketState] UserState socketState
         * @property {string|null} [socketStateTxt] UserState socketStateTxt
         * @property {message.PushScreenState|null} [pushScreenState] UserState pushScreenState
         * @property {string|null} [pushScreenStateTxt] UserState pushScreenStateTxt
         * @property {boolean|null} [isAccessibility] UserState isAccessibility
         * @property {boolean|null} [isScreenLock] UserState isScreenLock
         * @property {number|Long|null} [instructLastTime] UserState instructLastTime
         * @property {number|Long|null} [heartbeatTime] UserState heartbeatTime
         * @property {boolean|null} [isMaskBlack] UserState isMaskBlack
         */

        /**
         * Constructs a new UserState.
         * @memberof message
         * @classdesc Represents a UserState.
         * @implements IUserState
         * @constructor
         * @param {message.IUserState=} [properties] Properties to set
         */
        function UserState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserState socketState.
         * @member {message.SocketState} socketState
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.socketState = 0;

        /**
         * UserState socketStateTxt.
         * @member {string} socketStateTxt
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.socketStateTxt = "";

        /**
         * UserState pushScreenState.
         * @member {message.PushScreenState} pushScreenState
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.pushScreenState = 0;

        /**
         * UserState pushScreenStateTxt.
         * @member {string} pushScreenStateTxt
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.pushScreenStateTxt = "";

        /**
         * UserState isAccessibility.
         * @member {boolean} isAccessibility
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.isAccessibility = false;

        /**
         * UserState isScreenLock.
         * @member {boolean} isScreenLock
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.isScreenLock = false;

        /**
         * UserState instructLastTime.
         * @member {number|Long} instructLastTime
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.instructLastTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserState heartbeatTime.
         * @member {number|Long} heartbeatTime
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.heartbeatTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserState isMaskBlack.
         * @member {boolean} isMaskBlack
         * @memberof message.UserState
         * @instance
         */
        UserState.prototype.isMaskBlack = false;

        /**
         * Creates a new UserState instance using the specified properties.
         * @function create
         * @memberof message.UserState
         * @static
         * @param {message.IUserState=} [properties] Properties to set
         * @returns {message.UserState} UserState instance
         */
        UserState.create = function create(properties) {
            return new UserState(properties);
        };

        /**
         * Encodes the specified UserState message. Does not implicitly {@link message.UserState.verify|verify} messages.
         * @function encode
         * @memberof message.UserState
         * @static
         * @param {message.IUserState} message UserState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.socketState != null && Object.hasOwnProperty.call(message, "socketState"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.socketState);
            if (message.socketStateTxt != null && Object.hasOwnProperty.call(message, "socketStateTxt"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.socketStateTxt);
            if (message.pushScreenState != null && Object.hasOwnProperty.call(message, "pushScreenState"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.pushScreenState);
            if (message.pushScreenStateTxt != null && Object.hasOwnProperty.call(message, "pushScreenStateTxt"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.pushScreenStateTxt);
            if (message.isAccessibility != null && Object.hasOwnProperty.call(message, "isAccessibility"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAccessibility);
            if (message.isScreenLock != null && Object.hasOwnProperty.call(message, "isScreenLock"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isScreenLock);
            if (message.instructLastTime != null && Object.hasOwnProperty.call(message, "instructLastTime"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.instructLastTime);
            if (message.heartbeatTime != null && Object.hasOwnProperty.call(message, "heartbeatTime"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.heartbeatTime);
            if (message.isMaskBlack != null && Object.hasOwnProperty.call(message, "isMaskBlack"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isMaskBlack);
            return writer;
        };

        /**
         * Encodes the specified UserState message, length delimited. Does not implicitly {@link message.UserState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.UserState
         * @static
         * @param {message.IUserState} message UserState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserState message from the specified reader or buffer.
         * @function decode
         * @memberof message.UserState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.UserState} UserState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.UserState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.socketState = reader.int32();
                        break;
                    }
                case 2: {
                        message.socketStateTxt = reader.string();
                        break;
                    }
                case 3: {
                        message.pushScreenState = reader.int32();
                        break;
                    }
                case 4: {
                        message.pushScreenStateTxt = reader.string();
                        break;
                    }
                case 5: {
                        message.isAccessibility = reader.bool();
                        break;
                    }
                case 6: {
                        message.isScreenLock = reader.bool();
                        break;
                    }
                case 7: {
                        message.instructLastTime = reader.int64();
                        break;
                    }
                case 8: {
                        message.heartbeatTime = reader.int64();
                        break;
                    }
                case 9: {
                        message.isMaskBlack = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.UserState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.UserState} UserState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserState message.
         * @function verify
         * @memberof message.UserState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.socketState != null && message.hasOwnProperty("socketState"))
                switch (message.socketState) {
                default:
                    return "socketState: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.socketStateTxt != null && message.hasOwnProperty("socketStateTxt"))
                if (!$util.isString(message.socketStateTxt))
                    return "socketStateTxt: string expected";
            if (message.pushScreenState != null && message.hasOwnProperty("pushScreenState"))
                switch (message.pushScreenState) {
                default:
                    return "pushScreenState: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.pushScreenStateTxt != null && message.hasOwnProperty("pushScreenStateTxt"))
                if (!$util.isString(message.pushScreenStateTxt))
                    return "pushScreenStateTxt: string expected";
            if (message.isAccessibility != null && message.hasOwnProperty("isAccessibility"))
                if (typeof message.isAccessibility !== "boolean")
                    return "isAccessibility: boolean expected";
            if (message.isScreenLock != null && message.hasOwnProperty("isScreenLock"))
                if (typeof message.isScreenLock !== "boolean")
                    return "isScreenLock: boolean expected";
            if (message.instructLastTime != null && message.hasOwnProperty("instructLastTime"))
                if (!$util.isInteger(message.instructLastTime) && !(message.instructLastTime && $util.isInteger(message.instructLastTime.low) && $util.isInteger(message.instructLastTime.high)))
                    return "instructLastTime: integer|Long expected";
            if (message.heartbeatTime != null && message.hasOwnProperty("heartbeatTime"))
                if (!$util.isInteger(message.heartbeatTime) && !(message.heartbeatTime && $util.isInteger(message.heartbeatTime.low) && $util.isInteger(message.heartbeatTime.high)))
                    return "heartbeatTime: integer|Long expected";
            if (message.isMaskBlack != null && message.hasOwnProperty("isMaskBlack"))
                if (typeof message.isMaskBlack !== "boolean")
                    return "isMaskBlack: boolean expected";
            return null;
        };

        /**
         * Creates a UserState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.UserState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.UserState} UserState
         */
        UserState.fromObject = function fromObject(object) {
            if (object instanceof $root.message.UserState)
                return object;
            let message = new $root.message.UserState();
            switch (object.socketState) {
            default:
                if (typeof object.socketState === "number") {
                    message.socketState = object.socketState;
                    break;
                }
                break;
            case "SOCKET_UN_CONNECT":
            case 0:
                message.socketState = 0;
                break;
            case "SOCKET_CONNECT_ING":
            case 1:
                message.socketState = 1;
                break;
            case "SOCKET_CONNECT_SUCCESS":
            case 2:
                message.socketState = 2;
                break;
            case "SOCKET_CONNECT_CLOSE":
            case 3:
                message.socketState = 3;
                break;
            case "SOCKET_CONNECT_ERROR":
            case 4:
                message.socketState = 4;
                break;
            }
            if (object.socketStateTxt != null)
                message.socketStateTxt = String(object.socketStateTxt);
            switch (object.pushScreenState) {
            default:
                if (typeof object.pushScreenState === "number") {
                    message.pushScreenState = object.pushScreenState;
                    break;
                }
                break;
            case "PUSH_UN_CONNECT":
            case 0:
                message.pushScreenState = 0;
                break;
            case "PUSH_CONNECT_ING":
            case 1:
                message.pushScreenState = 1;
                break;
            case "PUSH_CONNECT_SUCCESS":
            case 2:
                message.pushScreenState = 2;
                break;
            case "PUSH_DIS_CONNECTE":
            case 3:
                message.pushScreenState = 3;
                break;
            case "PUSH_RE_CONNECT":
            case 4:
                message.pushScreenState = 4;
                break;
            }
            if (object.pushScreenStateTxt != null)
                message.pushScreenStateTxt = String(object.pushScreenStateTxt);
            if (object.isAccessibility != null)
                message.isAccessibility = Boolean(object.isAccessibility);
            if (object.isScreenLock != null)
                message.isScreenLock = Boolean(object.isScreenLock);
            if (object.instructLastTime != null)
                if ($util.Long)
                    (message.instructLastTime = $util.Long.fromValue(object.instructLastTime)).unsigned = false;
                else if (typeof object.instructLastTime === "string")
                    message.instructLastTime = parseInt(object.instructLastTime, 10);
                else if (typeof object.instructLastTime === "number")
                    message.instructLastTime = object.instructLastTime;
                else if (typeof object.instructLastTime === "object")
                    message.instructLastTime = new $util.LongBits(object.instructLastTime.low >>> 0, object.instructLastTime.high >>> 0).toNumber();
            if (object.heartbeatTime != null)
                if ($util.Long)
                    (message.heartbeatTime = $util.Long.fromValue(object.heartbeatTime)).unsigned = false;
                else if (typeof object.heartbeatTime === "string")
                    message.heartbeatTime = parseInt(object.heartbeatTime, 10);
                else if (typeof object.heartbeatTime === "number")
                    message.heartbeatTime = object.heartbeatTime;
                else if (typeof object.heartbeatTime === "object")
                    message.heartbeatTime = new $util.LongBits(object.heartbeatTime.low >>> 0, object.heartbeatTime.high >>> 0).toNumber();
            if (object.isMaskBlack != null)
                message.isMaskBlack = Boolean(object.isMaskBlack);
            return message;
        };

        /**
         * Creates a plain object from a UserState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.UserState
         * @static
         * @param {message.UserState} message UserState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.socketState = options.enums === String ? "SOCKET_UN_CONNECT" : 0;
                object.socketStateTxt = "";
                object.pushScreenState = options.enums === String ? "PUSH_UN_CONNECT" : 0;
                object.pushScreenStateTxt = "";
                object.isAccessibility = false;
                object.isScreenLock = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.instructLastTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.instructLastTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.heartbeatTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.heartbeatTime = options.longs === String ? "0" : 0;
                object.isMaskBlack = false;
            }
            if (message.socketState != null && message.hasOwnProperty("socketState"))
                object.socketState = options.enums === String ? $root.message.SocketState[message.socketState] === undefined ? message.socketState : $root.message.SocketState[message.socketState] : message.socketState;
            if (message.socketStateTxt != null && message.hasOwnProperty("socketStateTxt"))
                object.socketStateTxt = message.socketStateTxt;
            if (message.pushScreenState != null && message.hasOwnProperty("pushScreenState"))
                object.pushScreenState = options.enums === String ? $root.message.PushScreenState[message.pushScreenState] === undefined ? message.pushScreenState : $root.message.PushScreenState[message.pushScreenState] : message.pushScreenState;
            if (message.pushScreenStateTxt != null && message.hasOwnProperty("pushScreenStateTxt"))
                object.pushScreenStateTxt = message.pushScreenStateTxt;
            if (message.isAccessibility != null && message.hasOwnProperty("isAccessibility"))
                object.isAccessibility = message.isAccessibility;
            if (message.isScreenLock != null && message.hasOwnProperty("isScreenLock"))
                object.isScreenLock = message.isScreenLock;
            if (message.instructLastTime != null && message.hasOwnProperty("instructLastTime"))
                if (typeof message.instructLastTime === "number")
                    object.instructLastTime = options.longs === String ? String(message.instructLastTime) : message.instructLastTime;
                else
                    object.instructLastTime = options.longs === String ? $util.Long.prototype.toString.call(message.instructLastTime) : options.longs === Number ? new $util.LongBits(message.instructLastTime.low >>> 0, message.instructLastTime.high >>> 0).toNumber() : message.instructLastTime;
            if (message.heartbeatTime != null && message.hasOwnProperty("heartbeatTime"))
                if (typeof message.heartbeatTime === "number")
                    object.heartbeatTime = options.longs === String ? String(message.heartbeatTime) : message.heartbeatTime;
                else
                    object.heartbeatTime = options.longs === String ? $util.Long.prototype.toString.call(message.heartbeatTime) : options.longs === Number ? new $util.LongBits(message.heartbeatTime.low >>> 0, message.heartbeatTime.high >>> 0).toNumber() : message.heartbeatTime;
            if (message.isMaskBlack != null && message.hasOwnProperty("isMaskBlack"))
                object.isMaskBlack = message.isMaskBlack;
            return object;
        };

        /**
         * Converts this UserState to JSON.
         * @function toJSON
         * @memberof message.UserState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserState
         * @function getTypeUrl
         * @memberof message.UserState
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.UserState";
        };

        return UserState;
    })();

    message.TouchXY = (function() {

        /**
         * Properties of a TouchXY.
         * @memberof message
         * @interface ITouchXY
         * @property {number|null} [pressX] TouchXY pressX
         * @property {number|null} [pressY] TouchXY pressY
         * @property {number|null} [moveX] TouchXY moveX
         * @property {number|null} [moveY] TouchXY moveY
         * @property {number|Long|null} [duration] TouchXY duration
         */

        /**
         * Constructs a new TouchXY.
         * @memberof message
         * @classdesc Represents a TouchXY.
         * @implements ITouchXY
         * @constructor
         * @param {message.ITouchXY=} [properties] Properties to set
         */
        function TouchXY(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TouchXY pressX.
         * @member {number} pressX
         * @memberof message.TouchXY
         * @instance
         */
        TouchXY.prototype.pressX = 0;

        /**
         * TouchXY pressY.
         * @member {number} pressY
         * @memberof message.TouchXY
         * @instance
         */
        TouchXY.prototype.pressY = 0;

        /**
         * TouchXY moveX.
         * @member {number} moveX
         * @memberof message.TouchXY
         * @instance
         */
        TouchXY.prototype.moveX = 0;

        /**
         * TouchXY moveY.
         * @member {number} moveY
         * @memberof message.TouchXY
         * @instance
         */
        TouchXY.prototype.moveY = 0;

        /**
         * TouchXY duration.
         * @member {number|Long} duration
         * @memberof message.TouchXY
         * @instance
         */
        TouchXY.prototype.duration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new TouchXY instance using the specified properties.
         * @function create
         * @memberof message.TouchXY
         * @static
         * @param {message.ITouchXY=} [properties] Properties to set
         * @returns {message.TouchXY} TouchXY instance
         */
        TouchXY.create = function create(properties) {
            return new TouchXY(properties);
        };

        /**
         * Encodes the specified TouchXY message. Does not implicitly {@link message.TouchXY.verify|verify} messages.
         * @function encode
         * @memberof message.TouchXY
         * @static
         * @param {message.ITouchXY} message TouchXY message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TouchXY.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pressX != null && Object.hasOwnProperty.call(message, "pressX"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.pressX);
            if (message.pressY != null && Object.hasOwnProperty.call(message, "pressY"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.pressY);
            if (message.moveX != null && Object.hasOwnProperty.call(message, "moveX"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.moveX);
            if (message.moveY != null && Object.hasOwnProperty.call(message, "moveY"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.moveY);
            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.duration);
            return writer;
        };

        /**
         * Encodes the specified TouchXY message, length delimited. Does not implicitly {@link message.TouchXY.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.TouchXY
         * @static
         * @param {message.ITouchXY} message TouchXY message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TouchXY.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TouchXY message from the specified reader or buffer.
         * @function decode
         * @memberof message.TouchXY
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.TouchXY} TouchXY
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TouchXY.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.TouchXY();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pressX = reader.float();
                        break;
                    }
                case 2: {
                        message.pressY = reader.float();
                        break;
                    }
                case 3: {
                        message.moveX = reader.float();
                        break;
                    }
                case 4: {
                        message.moveY = reader.float();
                        break;
                    }
                case 5: {
                        message.duration = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TouchXY message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.TouchXY
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.TouchXY} TouchXY
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TouchXY.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TouchXY message.
         * @function verify
         * @memberof message.TouchXY
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TouchXY.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pressX != null && message.hasOwnProperty("pressX"))
                if (typeof message.pressX !== "number")
                    return "pressX: number expected";
            if (message.pressY != null && message.hasOwnProperty("pressY"))
                if (typeof message.pressY !== "number")
                    return "pressY: number expected";
            if (message.moveX != null && message.hasOwnProperty("moveX"))
                if (typeof message.moveX !== "number")
                    return "moveX: number expected";
            if (message.moveY != null && message.hasOwnProperty("moveY"))
                if (typeof message.moveY !== "number")
                    return "moveY: number expected";
            if (message.duration != null && message.hasOwnProperty("duration"))
                if (!$util.isInteger(message.duration) && !(message.duration && $util.isInteger(message.duration.low) && $util.isInteger(message.duration.high)))
                    return "duration: integer|Long expected";
            return null;
        };

        /**
         * Creates a TouchXY message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.TouchXY
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.TouchXY} TouchXY
         */
        TouchXY.fromObject = function fromObject(object) {
            if (object instanceof $root.message.TouchXY)
                return object;
            let message = new $root.message.TouchXY();
            if (object.pressX != null)
                message.pressX = Number(object.pressX);
            if (object.pressY != null)
                message.pressY = Number(object.pressY);
            if (object.moveX != null)
                message.moveX = Number(object.moveX);
            if (object.moveY != null)
                message.moveY = Number(object.moveY);
            if (object.duration != null)
                if ($util.Long)
                    (message.duration = $util.Long.fromValue(object.duration)).unsigned = false;
                else if (typeof object.duration === "string")
                    message.duration = parseInt(object.duration, 10);
                else if (typeof object.duration === "number")
                    message.duration = object.duration;
                else if (typeof object.duration === "object")
                    message.duration = new $util.LongBits(object.duration.low >>> 0, object.duration.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a TouchXY message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.TouchXY
         * @static
         * @param {message.TouchXY} message TouchXY
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TouchXY.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.pressX = 0;
                object.pressY = 0;
                object.moveX = 0;
                object.moveY = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.duration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.duration = options.longs === String ? "0" : 0;
            }
            if (message.pressX != null && message.hasOwnProperty("pressX"))
                object.pressX = options.json && !isFinite(message.pressX) ? String(message.pressX) : message.pressX;
            if (message.pressY != null && message.hasOwnProperty("pressY"))
                object.pressY = options.json && !isFinite(message.pressY) ? String(message.pressY) : message.pressY;
            if (message.moveX != null && message.hasOwnProperty("moveX"))
                object.moveX = options.json && !isFinite(message.moveX) ? String(message.moveX) : message.moveX;
            if (message.moveY != null && message.hasOwnProperty("moveY"))
                object.moveY = options.json && !isFinite(message.moveY) ? String(message.moveY) : message.moveY;
            if (message.duration != null && message.hasOwnProperty("duration"))
                if (typeof message.duration === "number")
                    object.duration = options.longs === String ? String(message.duration) : message.duration;
                else
                    object.duration = options.longs === String ? $util.Long.prototype.toString.call(message.duration) : options.longs === Number ? new $util.LongBits(message.duration.low >>> 0, message.duration.high >>> 0).toNumber() : message.duration;
            return object;
        };

        /**
         * Converts this TouchXY to JSON.
         * @function toJSON
         * @memberof message.TouchXY
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TouchXY.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TouchXY
         * @function getTypeUrl
         * @memberof message.TouchXY
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TouchXY.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.TouchXY";
        };

        return TouchXY;
    })();

    message.LogInfo = (function() {

        /**
         * Properties of a LogInfo.
         * @memberof message
         * @interface ILogInfo
         * @property {string|null} [packageName] LogInfo packageName
         * @property {string|null} [className] LogInfo className
         * @property {string|null} [content] LogInfo content
         */

        /**
         * Constructs a new LogInfo.
         * @memberof message
         * @classdesc Represents a LogInfo.
         * @implements ILogInfo
         * @constructor
         * @param {message.ILogInfo=} [properties] Properties to set
         */
        function LogInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogInfo packageName.
         * @member {string} packageName
         * @memberof message.LogInfo
         * @instance
         */
        LogInfo.prototype.packageName = "";

        /**
         * LogInfo className.
         * @member {string} className
         * @memberof message.LogInfo
         * @instance
         */
        LogInfo.prototype.className = "";

        /**
         * LogInfo content.
         * @member {string} content
         * @memberof message.LogInfo
         * @instance
         */
        LogInfo.prototype.content = "";

        /**
         * Creates a new LogInfo instance using the specified properties.
         * @function create
         * @memberof message.LogInfo
         * @static
         * @param {message.ILogInfo=} [properties] Properties to set
         * @returns {message.LogInfo} LogInfo instance
         */
        LogInfo.create = function create(properties) {
            return new LogInfo(properties);
        };

        /**
         * Encodes the specified LogInfo message. Does not implicitly {@link message.LogInfo.verify|verify} messages.
         * @function encode
         * @memberof message.LogInfo
         * @static
         * @param {message.ILogInfo} message LogInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.packageName != null && Object.hasOwnProperty.call(message, "packageName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.packageName);
            if (message.className != null && Object.hasOwnProperty.call(message, "className"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.className);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified LogInfo message, length delimited. Does not implicitly {@link message.LogInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.LogInfo
         * @static
         * @param {message.ILogInfo} message LogInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogInfo message from the specified reader or buffer.
         * @function decode
         * @memberof message.LogInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.LogInfo} LogInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.LogInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.packageName = reader.string();
                        break;
                    }
                case 2: {
                        message.className = reader.string();
                        break;
                    }
                case 3: {
                        message.content = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LogInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.LogInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.LogInfo} LogInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogInfo message.
         * @function verify
         * @memberof message.LogInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.packageName != null && message.hasOwnProperty("packageName"))
                if (!$util.isString(message.packageName))
                    return "packageName: string expected";
            if (message.className != null && message.hasOwnProperty("className"))
                if (!$util.isString(message.className))
                    return "className: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates a LogInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.LogInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.LogInfo} LogInfo
         */
        LogInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.message.LogInfo)
                return object;
            let message = new $root.message.LogInfo();
            if (object.packageName != null)
                message.packageName = String(object.packageName);
            if (object.className != null)
                message.className = String(object.className);
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a LogInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.LogInfo
         * @static
         * @param {message.LogInfo} message LogInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.packageName = "";
                object.className = "";
                object.content = "";
            }
            if (message.packageName != null && message.hasOwnProperty("packageName"))
                object.packageName = message.packageName;
            if (message.className != null && message.hasOwnProperty("className"))
                object.className = message.className;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this LogInfo to JSON.
         * @function toJSON
         * @memberof message.LogInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LogInfo
         * @function getTypeUrl
         * @memberof message.LogInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LogInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.LogInfo";
        };

        return LogInfo;
    })();

    message.AdminLoginRequest = (function() {

        /**
         * Properties of an AdminLoginRequest.
         * @memberof message
         * @interface IAdminLoginRequest
         * @property {string|null} [username] AdminLoginRequest username
         * @property {string|null} [password] AdminLoginRequest password
         */

        /**
         * Constructs a new AdminLoginRequest.
         * @memberof message
         * @classdesc Represents an AdminLoginRequest.
         * @implements IAdminLoginRequest
         * @constructor
         * @param {message.IAdminLoginRequest=} [properties] Properties to set
         */
        function AdminLoginRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminLoginRequest username.
         * @member {string} username
         * @memberof message.AdminLoginRequest
         * @instance
         */
        AdminLoginRequest.prototype.username = "";

        /**
         * AdminLoginRequest password.
         * @member {string} password
         * @memberof message.AdminLoginRequest
         * @instance
         */
        AdminLoginRequest.prototype.password = "";

        /**
         * Creates a new AdminLoginRequest instance using the specified properties.
         * @function create
         * @memberof message.AdminLoginRequest
         * @static
         * @param {message.IAdminLoginRequest=} [properties] Properties to set
         * @returns {message.AdminLoginRequest} AdminLoginRequest instance
         */
        AdminLoginRequest.create = function create(properties) {
            return new AdminLoginRequest(properties);
        };

        /**
         * Encodes the specified AdminLoginRequest message. Does not implicitly {@link message.AdminLoginRequest.verify|verify} messages.
         * @function encode
         * @memberof message.AdminLoginRequest
         * @static
         * @param {message.IAdminLoginRequest} message AdminLoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminLoginRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
            return writer;
        };

        /**
         * Encodes the specified AdminLoginRequest message, length delimited. Does not implicitly {@link message.AdminLoginRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.AdminLoginRequest
         * @static
         * @param {message.IAdminLoginRequest} message AdminLoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminLoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AdminLoginRequest message from the specified reader or buffer.
         * @function decode
         * @memberof message.AdminLoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.AdminLoginRequest} AdminLoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminLoginRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.AdminLoginRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.username = reader.string();
                        break;
                    }
                case 2: {
                        message.password = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AdminLoginRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.AdminLoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.AdminLoginRequest} AdminLoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminLoginRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminLoginRequest message.
         * @function verify
         * @memberof message.AdminLoginRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminLoginRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            return null;
        };

        /**
         * Creates an AdminLoginRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.AdminLoginRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.AdminLoginRequest} AdminLoginRequest
         */
        AdminLoginRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.message.AdminLoginRequest)
                return object;
            let message = new $root.message.AdminLoginRequest();
            if (object.username != null)
                message.username = String(object.username);
            if (object.password != null)
                message.password = String(object.password);
            return message;
        };

        /**
         * Creates a plain object from an AdminLoginRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.AdminLoginRequest
         * @static
         * @param {message.AdminLoginRequest} message AdminLoginRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminLoginRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.username = "";
                object.password = "";
            }
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            return object;
        };

        /**
         * Converts this AdminLoginRequest to JSON.
         * @function toJSON
         * @memberof message.AdminLoginRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminLoginRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminLoginRequest
         * @function getTypeUrl
         * @memberof message.AdminLoginRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminLoginRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.AdminLoginRequest";
        };

        return AdminLoginRequest;
    })();

    message.AdminLoginResponse = (function() {

        /**
         * Properties of an AdminLoginResponse.
         * @memberof message
         * @interface IAdminLoginResponse
         * @property {boolean|null} [isLoginSuccess] AdminLoginResponse isLoginSuccess
         * @property {string|null} [msg] AdminLoginResponse msg
         */

        /**
         * Constructs a new AdminLoginResponse.
         * @memberof message
         * @classdesc Represents an AdminLoginResponse.
         * @implements IAdminLoginResponse
         * @constructor
         * @param {message.IAdminLoginResponse=} [properties] Properties to set
         */
        function AdminLoginResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminLoginResponse isLoginSuccess.
         * @member {boolean} isLoginSuccess
         * @memberof message.AdminLoginResponse
         * @instance
         */
        AdminLoginResponse.prototype.isLoginSuccess = false;

        /**
         * AdminLoginResponse msg.
         * @member {string} msg
         * @memberof message.AdminLoginResponse
         * @instance
         */
        AdminLoginResponse.prototype.msg = "";

        /**
         * Creates a new AdminLoginResponse instance using the specified properties.
         * @function create
         * @memberof message.AdminLoginResponse
         * @static
         * @param {message.IAdminLoginResponse=} [properties] Properties to set
         * @returns {message.AdminLoginResponse} AdminLoginResponse instance
         */
        AdminLoginResponse.create = function create(properties) {
            return new AdminLoginResponse(properties);
        };

        /**
         * Encodes the specified AdminLoginResponse message. Does not implicitly {@link message.AdminLoginResponse.verify|verify} messages.
         * @function encode
         * @memberof message.AdminLoginResponse
         * @static
         * @param {message.IAdminLoginResponse} message AdminLoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminLoginResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isLoginSuccess != null && Object.hasOwnProperty.call(message, "isLoginSuccess"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isLoginSuccess);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified AdminLoginResponse message, length delimited. Does not implicitly {@link message.AdminLoginResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.AdminLoginResponse
         * @static
         * @param {message.IAdminLoginResponse} message AdminLoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminLoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AdminLoginResponse message from the specified reader or buffer.
         * @function decode
         * @memberof message.AdminLoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.AdminLoginResponse} AdminLoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminLoginResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.AdminLoginResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.isLoginSuccess = reader.bool();
                        break;
                    }
                case 2: {
                        message.msg = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AdminLoginResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.AdminLoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.AdminLoginResponse} AdminLoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminLoginResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminLoginResponse message.
         * @function verify
         * @memberof message.AdminLoginResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminLoginResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isLoginSuccess != null && message.hasOwnProperty("isLoginSuccess"))
                if (typeof message.isLoginSuccess !== "boolean")
                    return "isLoginSuccess: boolean expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates an AdminLoginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.AdminLoginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.AdminLoginResponse} AdminLoginResponse
         */
        AdminLoginResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.message.AdminLoginResponse)
                return object;
            let message = new $root.message.AdminLoginResponse();
            if (object.isLoginSuccess != null)
                message.isLoginSuccess = Boolean(object.isLoginSuccess);
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from an AdminLoginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.AdminLoginResponse
         * @static
         * @param {message.AdminLoginResponse} message AdminLoginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminLoginResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.isLoginSuccess = false;
                object.msg = "";
            }
            if (message.isLoginSuccess != null && message.hasOwnProperty("isLoginSuccess"))
                object.isLoginSuccess = message.isLoginSuccess;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this AdminLoginResponse to JSON.
         * @function toJSON
         * @memberof message.AdminLoginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminLoginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminLoginResponse
         * @function getTypeUrl
         * @memberof message.AdminLoginResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminLoginResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.AdminLoginResponse";
        };

        return AdminLoginResponse;
    })();

    message.InputPassword = (function() {

        /**
         * Properties of an InputPassword.
         * @memberof message
         * @interface IInputPassword
         * @property {message.PasswordType|null} [type] InputPassword type
         * @property {string|null} [content] InputPassword content
         */

        /**
         * Constructs a new InputPassword.
         * @memberof message
         * @classdesc Represents an InputPassword.
         * @implements IInputPassword
         * @constructor
         * @param {message.IInputPassword=} [properties] Properties to set
         */
        function InputPassword(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InputPassword type.
         * @member {message.PasswordType} type
         * @memberof message.InputPassword
         * @instance
         */
        InputPassword.prototype.type = 0;

        /**
         * InputPassword content.
         * @member {string} content
         * @memberof message.InputPassword
         * @instance
         */
        InputPassword.prototype.content = "";

        /**
         * Creates a new InputPassword instance using the specified properties.
         * @function create
         * @memberof message.InputPassword
         * @static
         * @param {message.IInputPassword=} [properties] Properties to set
         * @returns {message.InputPassword} InputPassword instance
         */
        InputPassword.create = function create(properties) {
            return new InputPassword(properties);
        };

        /**
         * Encodes the specified InputPassword message. Does not implicitly {@link message.InputPassword.verify|verify} messages.
         * @function encode
         * @memberof message.InputPassword
         * @static
         * @param {message.IInputPassword} message InputPassword message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InputPassword.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified InputPassword message, length delimited. Does not implicitly {@link message.InputPassword.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.InputPassword
         * @static
         * @param {message.IInputPassword} message InputPassword message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InputPassword.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InputPassword message from the specified reader or buffer.
         * @function decode
         * @memberof message.InputPassword
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.InputPassword} InputPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InputPassword.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.InputPassword();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.content = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InputPassword message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.InputPassword
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.InputPassword} InputPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InputPassword.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InputPassword message.
         * @function verify
         * @memberof message.InputPassword
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InputPassword.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates an InputPassword message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.InputPassword
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.InputPassword} InputPassword
         */
        InputPassword.fromObject = function fromObject(object) {
            if (object instanceof $root.message.InputPassword)
                return object;
            let message = new $root.message.InputPassword();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "WEIXIN":
            case 0:
                message.type = 0;
                break;
            case "ZHIFUBAO":
            case 1:
                message.type = 1;
                break;
            }
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from an InputPassword message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.InputPassword
         * @static
         * @param {message.InputPassword} message InputPassword
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InputPassword.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "WEIXIN" : 0;
                object.content = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.message.PasswordType[message.type] === undefined ? message.type : $root.message.PasswordType[message.type] : message.type;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this InputPassword to JSON.
         * @function toJSON
         * @memberof message.InputPassword
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InputPassword.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InputPassword
         * @function getTypeUrl
         * @memberof message.InputPassword
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InputPassword.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/message.InputPassword";
        };

        return InputPassword;
    })();

    return message;
})();

export { $root as default };
