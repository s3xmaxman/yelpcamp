const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
        email:{
            type: String,
            required: true,
            unique: true
        },
});

UserSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        UserExistsError: 'このメールアドレスは既に登録されています',
        IncorrectPasswordError: 'パスワードが間違っています',
        IncorrectUsernameError: 'ユーザー名が間違っています',
        MissingUsernameError: 'ユーザー名がありません',
        MissingPasswordError: 'パスワードがありません',
        AttemptTooSoonError: 'アカウントがロックされました。しばらくしてから再度お試しください',
        TooManyAttemptsError: 'アカウントがロックされました。しばらくしてから再度お試しください',
        NoSaltValueStoredError: '認証に失敗しました。しばらくしてから再度お試しください',
        }});
module.exports = mongoose.model('User', UserSchema);