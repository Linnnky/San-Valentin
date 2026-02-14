import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import chainedHeart from '../../assets/chained-heart.png';

interface KissLockProps {
  isOpen: boolean;
  onUnlock: () => void;
  onClose: () => void;
}

export function KissLock({ isOpen, onUnlock, onClose }: KissLockProps) {
  const [kisses, setKisses] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const requiredKisses = 5;

  const handleKiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newKisses = kisses + 1;
    setKisses(newKisses);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHeart = { id: Date.now(), x, y };
    setHearts(prev => [...prev, newHeart]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);

    if (newKisses >= requiredKisses) {
      setTimeout(() => {
        onUnlock();
        setKisses(0);
        setHearts([]);
      }, 600);
    }
  };

  const handleClose = () => {
    setKisses(0);
    setHearts([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(30, 0, 10, 0.92)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '2.5rem 2rem',
              maxWidth: '400px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#FFB3C6',
                opacity: 0.7,
              }}
            >
              <X size={28} />
            </button>

            {/* Imagen del corazón encadenado */}
            <motion.img
              src={chainedHeart}
              alt="Corazón encadenado"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -2, 2, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                filter: kisses >= requiredKisses
                  ? 'drop-shadow(0 0 30px rgba(255, 100, 150, 0.8))'
                  : 'drop-shadow(0 0 15px rgba(255, 100, 150, 0.4))',
              }}
            />

            {/* Texto "Desbloquear con 5 besos" */}
            <motion.h2
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                fontWeight: 700,
                color: '#FFB3C6',
                fontFamily: "'Snell Roundhand', cursive",
                textAlign: 'center',
                margin: 0,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              Desbloquear con 5 besos
            </motion.h2>

            {/* Botón corazón para besar */}
            <div style={{ position: 'relative' }}>
              <motion.button
                onClick={handleKiss}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #D94B6B 0%, #FF6B8A 50%, #D94B6B 100%)',
                  boxShadow: '0 0 25px rgba(217, 75, 107, 0.6), inset 0 -3px 8px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible',
                }}
              >
                <Heart size={50} fill="white" color="white" />

                {/* Corazoncitos flotantes al pulsar */}
                {hearts.map(heart => (
                  <motion.div
                    key={heart.id}
                    initial={{ opacity: 1, scale: 0.5, x: heart.x - 50, y: heart.y - 50 }}
                    animate={{
                      opacity: 0,
                      scale: 1.5,
                      y: heart.y - 150,
                      x: heart.x - 50 + (Math.random() - 0.5) * 80,
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ position: 'absolute', pointerEvents: 'none' }}
                  >
                    <Heart size={20} fill="#FF6B8A" style={{ color: '#FF6B8A' }} />
                  </motion.div>
                ))}
              </motion.button>
            </div>

            {/* Indicador de besos (corazoncitos) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              alignItems: 'center',
            }}>
              {Array.from({ length: requiredKisses }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i < kisses ? [1, 1.4, 1] : 0.7,
                    opacity: i < kisses ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    size={22}
                    fill={i < kisses ? '#FF6B8A' : 'transparent'}
                    color={i < kisses ? '#FF6B8A' : '#FFB3C6'}
                  />
                </motion.div>
              ))}
            </div>

            {/* Contador */}
            <p style={{
              color: '#FFB3C6',
              fontSize: '1rem',
              fontFamily: "'Snell Roundhand', cursive",
              margin: 0,
              opacity: 0.8,
            }}>
              {kisses}/{requiredKisses} besos
            </p>

            {/* Mensaje de desbloqueo */}
            <AnimatePresence>
              {kisses >= requiredKisses && (
                <motion.p
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#FFB3C6',
                    fontFamily: "'Snell Roundhand', cursive",
                    margin: 0,
                    textShadow: '0 0 20px rgba(255, 107, 138, 0.8)',
                  }}
                >
                  ¡Desbloqueando!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
