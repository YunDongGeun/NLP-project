// PDF 업로드 및 질문 API

const API_BASE_URL = 'https://nlp.zito.kr'; // 서버 URL (필요시 수정)

/**
 * PDF 파일을 서버에 업로드합니다
 * @param {File} file - 업로드할 PDF 파일
 * @returns {Promise<Object>} 업로드 응답 (session_id 포함)
 */
export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('파일 업로드에 실패했습니다.');
  }

  return await response.json();
};

/**
 * PDF에 대한 질문을 서버에 전송합니다
 * @param {string} question - 질문 내용
 * @param {string} sessionId - 세션 ID
 * @returns {Promise<Object>} 답변 응답
 */
export const askQuestion = async (question, sessionId) => {
  const formData = new FormData();
  formData.append('question', question);
  formData.append('session_id', sessionId);

  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('질문 전송에 실패했습니다.');
  }

  return await response.json();
};

/**
 * PDF 파일의 다운로드 URL을 반환합니다
 * @param {string} sessionId - 세션 ID
 * @returns {string} PDF 뷰어 URL
 */
export const getPDFViewerUrl = (sessionId) => {
  return `${API_BASE_URL}/pdf/${sessionId}.pdf`;
};
