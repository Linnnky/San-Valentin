import { motion } from 'motion/react';
import { Heart, X } from 'lucide-react';
import photoAmor from '../../assets/photo-amor.png';

interface PhotoScreenProps {
  onClose: () => void;
}

export function PhotoScreen({ onClose }: PhotoScreenProps) {
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

      {/* Corazones flotantes de fondo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              position: 'absolute',
            }}
          >
            <Heart size={20} fill="#C93E61" style={{ color: '#C93E61', opacity: 0.3 }} />
          </motion.div>
        ))}
      </div>

      {/* ✨ Contenedor VERTICAL: imagen arriba, texto debajo */}
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
        {/* Imagen */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 30px rgba(201, 62, 97, 0.4)",
                "0 0 60px rgba(201, 62, 97, 0.7)",
                "0 0 30px rgba(201, 62, 97, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <img
              src={photoAmor}
              alt="El día más bonito de mi vida"
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

        {/* ✨ Texto JUSTO DEBAJO de la imagen (en flujo normal) */}
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
          {/* Mensaje principal */}
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
              El día más bonito de mi vida
            </h2>
          </div>

          {/* Texto secundario */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#FC8AA5',
              fontFamily: "'Snell Roundhand', cursive",
              margin: 0,
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Este recuerdo lo guardaré por siempre en mi corazón 💕
          </p>

          {/* Botón volver */}
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #C93E61 0%, #FC8AA5 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '0.75rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(201, 62, 97, 0.4)',
              transition: 'all 0.3s ease',
              marginTop: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(201, 62, 97, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(201, 62, 97, 0.4)';
            }}
          >
            Volver
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}