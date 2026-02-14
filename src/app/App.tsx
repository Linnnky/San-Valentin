import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, Camera, Mail, Flower2, Gift, X } from 'lucide-react';
import { KissLock } from './components/KissLock';
import { ProposalScreen } from './components/ProposalScreen';
import { SongScreen } from './components/SongScreen';
import { PhotoScreen } from './components/PhotoScreen';
import { ChocolateScreen } from './components/ChocolateScreen';
import { NoteScreen } from './components/NoteScreen';
import { FlowersScreen } from './components/FlowersScreen';
import selloPropuesta from '../assets/sello-propuesta.png';
import selloMusica from '../assets/sello5.png';
import selloFoto from '../assets/sello1.png';
import selloChocolate from '../assets/sello4.png';
import selloNota from '../assets/sello6.png';
import selloFlores from '../assets/sello3.png';

type Experience = 'proposal' | 'song' | 'photo' | 'chocolate' | 'note' | 'flowers' | null;

const stampImages: Record<string, string> = {
  'proposal': selloPropuesta,
  'song': selloMusica,
  'photo': selloFoto,
  'chocolate': selloChocolate,
  'note': selloNota,
  'flowers': selloFlores,
};

const experiences = [
  {
    id: 'proposal' as Experience,
    icon: Heart,
    title: 'Propuesta',
    color: '#D94B6B',
  },
  {
    id: 'song' as Experience,
    icon: Music,
    title: 'Canción',
    color: '#D94B6B',
  },
  {
    id: 'photo' as Experience,
    icon: Camera,
    title: 'Foto',
    color: '#D94B6B',
  },
  {
    id: 'chocolate' as Experience,
    icon: Gift,
    title: 'Chocolate',
    color: '#D94B6B',
  },
  {
    id: 'note' as Experience,
    icon: Mail,
    title: 'Nota',
    color: '#D94B6B',
  },
  {
    id: 'flowers' as Experience,
    icon: Flower2,
    title: 'Flores',
    color: '#D94B6B',
  },
];

export default function App() {
  const [currentExperience, setCurrentExperience] = useState<Experience>(null);
  const [lockTarget, setLockTarget] = useState<Experience>(null);

  const handleExperienceClick = (experience: Experience) => {
    setLockTarget(experience);
  };

  const handleUnlock = () => {
    setCurrentExperience(lockTarget);
    setLockTarget(null);
  };

  const handleLockClose = () => {
    setLockTarget(null);
  };

  const handleClose = () => {
    setCurrentExperience(null);
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: '#4A0E1F',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: 0,
              opacity: 0.15,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 5 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              position: 'absolute',
            }}
          >
            <Heart size={24} fill="#C93E61" style={{ color: '#C93E61' }} />
          </motion.div>
        ))}
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
      }}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          style={{ textAlign: 'center' }}
        >
          <motion.h1
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#FFB3C6',
              fontFamily: "'Nord poem', serif",
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Feliz San Valentín
          </motion.h1>
          <p 
            style={{ 
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              color: '#FFB3C6',
              fontFamily: "'Snell Roundhand', cursive",
              fontWeight: 400,
            }}
          >
            Haz clic en cada sello para descubrir una sorpresa
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          width: '100%',
          maxWidth: '1000px',
        }}>
          {experiences.map((exp, index) => {
            const stampImage = stampImages[exp.id || ''];
            
            return (
              <motion.button
                key={exp.id}
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: Math.random() * 8 - 4,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExperienceClick(exp.id)}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  padding: '0',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: `
                    0 10px 30px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.5)
                  `,
                  background: 'transparent',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                  <img
                    src={stampImage}
                    alt={`Sello ${exp.title}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '12px',
                    }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            textAlign: 'center',
            maxWidth: '600px',
            color: '#FFB3C6',
            fontFamily: "'Snell Roundhand', cursive",
            lineHeight: 1.6,
          }}
        >
          Cada sello tiene algo especial preparado para ti
        </motion.p>
      </div>

      <KissLock
        isOpen={lockTarget !== null}
        onUnlock={handleUnlock}
        onClose={handleLockClose}
      />

      <AnimatePresence>
        {currentExperience === 'proposal' && (
          <ProposalScreen onClose={handleClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentExperience === 'song' && (
          <SongScreen onClose={handleClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentExperience === 'photo' && (
          <PhotoScreen onClose={handleClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentExperience === 'chocolate' && (
          <ChocolateScreen onClose={handleClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentExperience === 'note' && (
          <NoteScreen onClose={handleClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentExperience === 'flowers' && (
          <FlowersScreen onClose={handleClose} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentExperience && currentExperience !== 'proposal' && currentExperience !== 'song' && currentExperience !== 'photo' && currentExperience !== 'chocolate' && currentExperience !== 'note' && currentExperience !== 'flowers' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem',
            }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", duration: 0.5 }}
              style={{
                backgroundColor: '#F8F5E8',
                borderRadius: '20px',
                padding: '3rem',
                maxWidth: '500px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#D94B6B',
                }}
              >
                <X size={32} />
              </button>

              <h2 style={{
                fontSize: '2.5rem',
                color: '#D94B6B',
                fontFamily: "'Snell Roundhand', cursive",
                marginBottom: '1rem',
              }}>
                {experiences.find(e => e.id === currentExperience)?.title}
              </h2>

              <p style={{
                fontSize: '1.25rem',
                color: '#666',
                fontFamily: "'Playfair Display', serif",
              }}>
                ¡Contenido especial aquí!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}