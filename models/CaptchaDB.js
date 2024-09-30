const { MessageAttachment } = require('discord.js');
let captchaText;

function setCaptchaText(text) {
  captchaText = text;
}

function getCaptchaText() {
  return captchaText;
}

//Verified Role Function
const VerifiedroleID = '' //New USer Role ID
function getCaptchaVerifiedRole() {
  return VerifiedroleID;
}

//Unverified Rol Function
const UnverifiedroleID = '' //Unverified Role ID
function getCaptchaUnverifiedRole() {
  return UnverifiedroleID;
}

//Verification Pass Banner
const VerifiedPassBanner = new MessageAttachment('./images/VerifierPassBanner.png')
function getVerifiedPassBanner() {
  return VerifiedPassBanner;
}

//Verfication Fail Banner
const VerifiedFailBanner = new MessageAttachment('./images/VerifierFailBanner.png')
function getVerifiedFailBanner() {
  return VerifiedFailBanner;
}

module.exports = {
  setCaptchaText,
  getCaptchaText,
  getCaptchaVerifiedRole,
  getCaptchaUnverifiedRole,
  getVerifiedPassBanner,
  getVerifiedFailBanner,
};