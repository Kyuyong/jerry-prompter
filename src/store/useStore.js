import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      scripts: [],
      activeScriptId: null,
      settings: {
        fontSize: 36,
        margin: 40,
        lineHeight: 1.8,
        scrollSpeed: 3,
        bgColor: '#000000',
        textColor: '#ffffff',
        flipH: false,
        flipV: false,
      },
      isPlaying: false,

      addScript: () => {
        const id = Date.now().toString()
        set((state) => ({
          scripts: [...state.scripts, { id, title: '새 스크립트', content: '' }],
          activeScriptId: id,
        }))
      },

      deleteScript: (id) => {
        set((state) => {
          const next = state.scripts.filter((s) => s.id !== id)
          return {
            scripts: next,
            activeScriptId:
              state.activeScriptId === id ? (next[0]?.id ?? null) : state.activeScriptId,
          }
        })
      },

      selectScript: (id) => set({ activeScriptId: id }),

      updateScript: (id, changes) =>
        set((state) => ({
          scripts: state.scripts.map((s) => (s.id === id ? { ...s, ...changes } : s)),
        })),

      updateSettings: (changes) =>
        set((state) => ({ settings: { ...state.settings, ...changes } })),

      setPlaying: (playing) => set({ isPlaying: playing }),
      togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
    }),
    {
      name: 'jerry-prompter',
      partialize: (state) => ({
        scripts: state.scripts,
        activeScriptId: state.activeScriptId,
        settings: state.settings,
      }),
    },
  ),
)

export default useStore
