"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietSchema = exports.Diet = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var DietSchema = new mongoose_1.Schema({
    diet_name: {
        type: String,
    },
    diet_description: {
        type: String,
    },
    diet_image: {
        type: String,
    },
    diet_plan: {
        plan_breakfast: {
            type: String,
        },
        plan_lunch: {
            type: String,
        },
        plan_dinner: {
            type: String,
        },
        plan_snack: {
            type: String,
        },
    },
    diet_range: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Range",
    },
}, {
    toJSON: {
        transform: function (doc, ret, ant) {
            ret.id = ret._id;
        },
    },
});
exports.DietSchema = DietSchema;
var Diet = mongoose_1.default.model("Diet", DietSchema);
exports.Diet = Diet;
