import { motion } from 'motion/react';
import { X } from 'lucide-react';
import floresImg from '../../assets/flores.png';

interface FlowersScreenProps {
  onClose: () => void;
}

export function FlowersScreen({ onClose }: FlowersScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(63, 1, 16, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'auto',
      }}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#FC8AA5',
          zIndex: 100,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <X size={28} strokeWidth={2.5} />
      </button>

      {/* Contenedor vertical: imagen + texto */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        maxWidth: '90vw',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Imagen con shake animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            animate={{
              // Shake suave: movimiento horizontal y rotación
              x: [-2, 2, -2, 2, 0],
              rotate: [-1, 1, -1, 1, 0],
              boxShadow: [
                "0 0 30px rgba(201, 62, 97, 0.4)",
                "0 0 60px rgba(201, 62, 97, 0.7)",
                "0 0 30px rgba(201, 62, 97, 0.4)",
              ],
            }}
            transition={{
              x: {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              },
              rotate: {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              },
              boxShadow: {
                duration: 2,
                repeat: Infinity,
              },
            }}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <img
              src={floresImg}
              alt="Flores"
              style={{
                display: 'block',
                maxWidth: '85vw',
                maxHeight: '65vh',
                objectFit: 'contain',
                borderRadius: '20px',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Texto debajo de la imagen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
          }}
        >
          {/* Mensaje */}
          <div
            style={{
              backgroundColor: 'rgba(63, 1, 16, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(252, 138, 165, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem 2.5rem',
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#FFB3C6',
                fontFamily: "'Snell Roundhand', cursive",
                textShadow: '0 2px 8px rgba(201, 62, 97, 0.8)',
                letterSpacing: '0.5px',
                margin: 0,
                textAlign: 'center',
              }}
            >
              Unas florecillas que no marchitan
            </h2>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
