import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, X, Play } from 'lucide-react';
import viniloImg from '../../assets/vinilo-corazon.png';

interface SongScreenProps {
  onClose: () => void;
}

export function SongScreen({ onClose }: SongScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
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
      {/* Partículas musicales de fondo */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: -30,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
              rotate: 0,
            }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 30,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 5 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            style={{ position: 'absolute', opacity: 0.25 }}
          >
            <Heart size={20} fill="#C93E61" style={{ color: '#C93E61' }} />
          </motion.div>
        ))}
      </div>

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#FFB3C6',
          zIndex: 20,
          opacity: 0.7,
        }}
      >
        <X size={32} />
      </button>

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
          gap: '1.5rem',
          padding: '2rem',
          maxWidth: '450px',
          width: '90%',
        }}
      >
        {/* Imagen del vinilo girando */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
          style={{ position: 'relative' }}
        >
          <img
            src={viniloImg}
            alt="Vinilo corazón"
            style={{
              width: 'clamp(180px, 45vw, 250px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 25px rgba(255, 100, 150, 0.4))',
            }}
          />

          {/* Botón play sobre el vinilo si no está sonando */}
          {!isPlaying && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlay}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #D94B6B 0%, #FF6B8A 100%)',
                boxShadow: '0 0 20px rgba(217, 75, 107, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Play size={28} fill="white" color="white" style={{ marginLeft: '3px' }} />
            </motion.button>
          )}
        </motion.div>

        {/* Título */}
        <motion.h2
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            fontWeight: 700,
            color: '#FFB3C6',
            fontFamily: "'Snell Roundhand', cursive",
            textAlign: 'center',
            margin: 0,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          Nuestra Canción
        </motion.h2>

        <p style={{
          fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          color: '#FFB3C6',
          fontFamily: "'Snell Roundhand', cursive",
          textAlign: 'center',
          margin: 0,
          opacity: 0.85,
        }}>
          {isPlaying
            ? 'Esta canción me recuerda a ti cada vez que la escucho'
            : 'Pulsa play para escuchar nuestra canción'}
        </p>

        {/* YouTube embed (oculto visualmente pero reproduciendo audio) */}
        {isPlaying && (
          <iframe
            ref={iframeRef}
            width="0"
            height="0"
            src="https://www.youtube.com/embed/8F7Q-4PZCjA?autoplay=1&loop=1&playlist=8F7Q-4PZCjA"
            title="Nuestra canción"
            allow="autoplay; encrypted-media"
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              border: 'none',
              overflow: 'hidden',
            }}
          />
        )}

        {/* Barras de audio animadas */}
        {isPlaying && (
          <div style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'flex-end',
            height: '30px',
          }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [8, 25 + Math.random() * 5, 10, 20 + Math.random() * 10, 8],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
                style={{
                  width: '4px',
                  borderRadius: '2px',
                  backgroundColor: '#FF6B8A',
                }}
              />
            ))}
          </div>
        )}

        {/* Botón volver */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          style={{
            marginTop: '0.5rem',
            padding: '0.7rem 1.8rem',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 700,
            fontFamily: "'Snell Roundhand', cursive",
            color: 'white',
            background: 'linear-gradient(135deg, #D94B6B 0%, #FF6B8A 100%)',
            boxShadow: '0 6px 20px rgba(217, 75, 107, 0.4)',
          }}
        >
          Volver
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
