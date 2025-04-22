// Created: 2025-04-22T18:03:00
// Module: HuggingFace 服务封装
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const HF_API_TOKEN = process.env.HF_API_TOKEN;
if (!HF_API_TOKEN) {
  console.warn('Missing HF_API_TOKEN in environment variables.');
}

const HF_HEADERS = {
  'Authorization': `Bearer ${HF_API_TOKEN}`,
  'Content-Type': 'application/json'
};

/**
 * 调用 mrm8488/t5-base-finetuned-question-generation-ap 模型生成文本
 * @param {string} prompt 输入提示词
 * @returns {Promise<string>} 生成的文本
 */
export async function generateText(prompt) {
  const url = 'https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-question-generation-ap';
  const response = await axios.post(url, { inputs: prompt }, { headers: HF_HEADERS });
  if (Array.isArray(response.data) && response.data[0].generated_text) {
    return response.data[0].generated_text;
  }
  throw new Error('Unexpected response from text generation model');
}

/**
 * 调用 stabilityai/stable-diffusion-2-1 模型生成图像，返回 Base64 数据
 * @param {string} prompt 图像生成提示词
 * @returns {Promise<string>} data URI 格式的 PNG 图像
 */
export async function generateImage(prompt) {
  const url = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';
  const opts = {
    headers: HF_HEADERS,
    responseType: 'arraybuffer'
  };
  const response = await axios.post(url, { inputs: prompt }, opts);
  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/png;base64,${base64}`;
}

/**
 * 调用 SWiViD/F5-TTS 模型生成语音，返回 Base64 数据
 * @param {string} text 文本内容
 * @returns {Promise<string>} data URI 格式的 MP3 音频
 */
export async function generateTTS(text) {
  const url = 'https://api-inference.huggingface.co/models/SWiViD/F5-TTS';
  const opts = {
    headers: HF_HEADERS,
    responseType: 'arraybuffer'
  };
  const response = await axios.post(url, { inputs: text }, opts);
  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  return `data:audio/mp3;base64,${base64}`;
}
