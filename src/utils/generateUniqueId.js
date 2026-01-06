/**
 * Generates a cryptographically secure random identifier.
 * NOT intended for authentication, authorization, or secrets.
 *
 * @returns {string} A UUID v4 string if supported, otherwise a 32-char hex string.
 * @throws {Error} If a secure random generator is unavailable.
 */
export const generateUniqueId = () => {
  const crypto = globalThis.crypto
  if (!crypto) {
    throw new Error('Secure random generator unavailable')
  }
  if (crypto.randomUUID) {
    return crypto.randomUUID()
  }
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  // keep hex-only format (no UUID bits)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}
