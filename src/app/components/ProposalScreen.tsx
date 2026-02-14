import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import cupidImg from '../../assets/cupid.png';

interface ProposalScreenProps {
  onClose: () => void;
}

export function ProposalScreen({ onClose }: ProposalScreenProps) {
  const [answer, setAnswer] = useState<'yes' | null>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);

  const handleYes = () => {
    setAnswer('yes');
  };

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * 250;
    const y = (Math.random() - 0.5) * 250;
    setNoPosition({ x, y });
    setNoAttempts(prev => prev + 1);
  };

  const getSubtext = () => {
    if (noAttempts === 0) return 'Mi corazón late solo por ti';
    if (noAttempts < 3) return 'Estoy esperando la respuesta correcta...';
    if (noAttempts < 6) return 'El botón "No" es muy escurridizo, ¿verdad?';
    return 'Ya sabes cuál es la única respuesta posible...';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A0E1F',
        overflow: 'hidden',
      }}
    >
      {/* Corazones flotantes de fondo */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -50, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800), rotate: 0 }}
            animate={{ y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50, rotate: 360 }}
            transition={{ duration: Math.random() * 5 + 6, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
            style={{ position: 'absolute', opacity: 0.3 }}
          >
            <Heart size={24} fill="#C93E61" style={{ color: '#C93E61' }} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          maxWidth: '500px',
          width: '90%',
        }}
      >
        <AnimatePresence mode="wait">
          {answer === null ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              {/* Imagen del cupido */}
              <motion.img
                src={cupidImg}
                alt="Cupido"
                animate={{ rotate: [0, -3, 3, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  width: 'clamp(180px, 40vw, 260px)',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 20px rgba(255, 100, 150, 0.4))',
                }}
              />

              {/* Pregunta */}
              <motion.h1
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  fontSize: 'clamp(1.8rem, 6vw, 3rem)',
                  fontWeight: 700,
                  color: '#FFB3C6',
                  fontFamily: "'Snell Roundhand', cursive",
                  textAlign: 'center',
                  margin: 0,
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)',
                  lineHeight: 1.3,
                }}
              >
                ¿Quieres ser mi San Valentín?
              </motion.h1>

              {/* Subtexto dinámico */}
              <p style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
                color: '#FFB3C6',
                fontFamily: "'Snell Roundhand', cursive",
                textAlign: 'center',
                margin: 0,
                opacity: 0.85,
                minHeight: '1.5em',
              }}>
                {getSubtext()}
              </p>

              {/* Botones */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                position: 'relative',
                height: '80px',
                width: '100%',
                alignItems: 'center',
              }}>
                {/* Botón SÍ */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYes}
                  style={{
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                    fontWeight: 700,
                    fontFamily: "'Snell Roundhand', cursive",
                    color: 'white',
                    background: 'linear-gradient(135deg, #D94B6B 0%, #FF6B8A 100%)',
                    boxShadow: '0 8px 25px rgba(217, 75, 107, 0.5)',
                    zIndex: 2,
                  }}
                >
                  ¡Sí!
                </motion.button>

                {/* Botón NO - se mueve al hacer click */}
                <motion.button
                  onClick={moveNoButton}
                  onMouseEnter={moveNoButton}
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  style={{
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    border: '2px solid #D94B6B',
                    cursor: 'pointer',
                    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                    fontWeight: 700,
                    fontFamily: "'Snell Roundhand', cursive",
                    color: '#FFB3C6',
                    backgroundColor: 'rgba(74, 14, 31, 0.8)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                  }}
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              {/* Corazón grande palpitando */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={100} fill="#FF6B8A" style={{ color: '#FF6B8A', filter: 'drop-shadow(0 0 30px rgba(255, 107, 138, 0.6))' }} />
              </motion.div>

              <motion.h2
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                style={{
                  fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                  fontWeight: 700,
                  color: '#FFB3C6',
                  fontFamily: "'Snell Roundhand', cursive",
                  textAlign: 'center',
                  margin: 0,
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)',
                }}
              >
                ¡Sabía que dirías que sí!
              </motion.h2>

              <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                color: '#FFB3C6',
                fontFamily: "'Snell Roundhand', cursive",
                textAlign: 'center',
                margin: 0,
              }}>
                ¡Eres la mejor San Valentín del mundo!
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.8rem 2rem',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  fontFamily: "'Snell Roundhand', cursive",
                  color: 'white',
                  background: 'linear-gradient(135deg, #D94B6B 0%, #FF6B8A 100%)',
                  boxShadow: '0 8px 25px rgba(217, 75, 107, 0.5)',
                }}
              >
                Continuar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
