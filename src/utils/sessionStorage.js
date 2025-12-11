// 로컬스토리지에서 PDF 세션 정보를 관리하는 유틸리티 함수

const SESSION_STORAGE_PREFIX = 'pdf_sessions_';

/**
 * 특정 사용자의 PDF 세션 목록을 가져옵니다
 * @param {string} userId - 사용자 ID
 * @returns {Array<{sessionId: string, fileName: string, uploadedAt: string, chunks: number}>} PDF 세션 배열
 */
export const getUserSessions = (userId) => {
  const key = SESSION_STORAGE_PREFIX + userId;
  const sessions = localStorage.getItem(key);
  return sessions ? JSON.parse(sessions) : [];
};

/**
 * 특정 사용자에게 새로운 PDF 세션을 추가합니다
 * @param {string} userId - 사용자 ID
 * @param {Object} pdfSession - PDF 세션 정보
 * @param {string} pdfSession.sessionId - 세션 ID
 * @param {string} pdfSession.fileName - 파일명
 * @param {number} pdfSession.chunks - 청크 수
 */
export const addUserSession = (userId, pdfSession) => {
  const sessions = getUserSessions(userId);

  // 중복 체크 (sessionId 기준)
  const exists = sessions.some(s => s.sessionId === pdfSession.sessionId);

  if (!exists) {
    // 새로운 세션 정보 추가
    const newSession = {
      sessionId: pdfSession.sessionId,
      fileName: pdfSession.fileName,
      uploadedAt: new Date().toISOString(),
      chunks: pdfSession.chunks || 0
    };

    sessions.push(newSession);
    const key = SESSION_STORAGE_PREFIX + userId;
    localStorage.setItem(key, JSON.stringify(sessions));
  }
};

/**
 * 특정 사용자의 PDF 세션을 삭제합니다
 * @param {string} userId - 사용자 ID
 * @param {string} sessionId - 삭제할 세션 ID
 */
export const removeUserSession = (userId, sessionId) => {
  const sessions = getUserSessions(userId);
  const filteredSessions = sessions.filter(s => s.sessionId !== sessionId);
  const key = SESSION_STORAGE_PREFIX + userId;
  localStorage.setItem(key, JSON.stringify(filteredSessions));
};

/**
 * 특정 사용자의 모든 세션을 삭제합니다
 * @param {string} userId - 사용자 ID
 */
export const clearUserSessions = (userId) => {
  const key = SESSION_STORAGE_PREFIX + userId;
  localStorage.removeItem(key);
};

/**
 * 모든 사용자의 세션 데이터를 가져옵니다
 * @returns {Object} 사용자별 세션 데이터 객체
 */
export const getAllSessions = () => {
  const allSessions = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(SESSION_STORAGE_PREFIX)) {
      const userId = key.replace(SESSION_STORAGE_PREFIX, '');
      allSessions[userId] = getUserSessions(userId);
    }
  }
  return allSessions;
};
