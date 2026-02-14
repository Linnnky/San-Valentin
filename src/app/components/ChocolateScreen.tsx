import { motion } from 'motion/react';
import { X } from 'lucide-react';
import chocolatesImg from '../../assets/chocolates.png';

interface ChocolateScreenProps {
  onClose: () => void;
}

export function ChocolateScreen({ onClose }: ChocolateScreenProps) {
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

      {/* Solo la imagen centrada */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
            src={chocolatesImg}
            alt="Chocolates"
            style={{
              display: 'block',
              maxWidth: '85vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: '20px',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}