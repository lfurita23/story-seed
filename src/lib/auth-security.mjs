// Verified authentication state must come from Supabase, never a local completion flag.
export function securityDestination(session,level,requireMfa=false){return !session?'/login/':!requireMfa||level==='aal2'?'/':'/security/'}
export function verifiedTotp(factors){return (factors||[]).find(f=>f.factor_type==='totp'&&f.status==='verified')||null}
