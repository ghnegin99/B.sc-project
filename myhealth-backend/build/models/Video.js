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
exports.Video = exports.VideoSchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var VideoSchema = new mongoose_1.Schema({
    id: {
        type: Number,
    },
    video_name: {
        type: String,
    },
    video_thmubnail: {
        type: String,
    },
    video_length: { type: Number },
    video_exercise_time: {
        type: String,
    },
    video_grade: {},
    video_description: {
        type: String,
    },
    video_status: {
        type: Number,
        default: 0,
    },
    video_affects: [],
    video_uploaded_file_name: { type: String },
    video_tags: [],
    video_range: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Range",
    },
}, {
    toJSON: {
        transform: function (doc, ret, any) {
            ret.id = ret._id;
        },
    },
});
exports.VideoSchema = VideoSchema;
var Video = mongoose_1.default.model("Video", VideoSchema);
exports.Video = Video;
VideoSchema.pre("save", function (next) {
    var doc = this;
    console.log("Pre Save");
});
