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
exports.RangeSchema = exports.Range = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var RangeSchema = new mongoose_1.Schema({
    range_name: {
        type: String,
        required: true,
    },
    range_start: {
        type: Number,
    },
    range_end: {
        type: Number,
    },
    range_status: {
        type: String,
    },
    range_description: {
        type: String,
    },
    range_videos: [
        {
            video_link: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Video",
            },
            video_description: {
                type: String,
            },
        },
    ],
    range_diets: [
        {
            diet_link: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Diet'
            },
            diet_description: {
                type: String,
            },
        },
    ],
}, {
    toJSON: {
        transform: function (doc, ret, any) {
            ret.id = ret._id;
        },
    },
});
exports.RangeSchema = RangeSchema;
var Range = mongoose_1.default.model("Range", RangeSchema);
exports.Range = Range;
