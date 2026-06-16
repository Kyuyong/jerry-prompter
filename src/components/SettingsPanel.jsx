import useStore from '../store/useStore'

const BG_PRESETS = ['#000000', '#ffffff', '#1a1a2e', '#2d2d2d']
const TEXT_PRESETS = ['#ffffff', '#000000', '#ffff00', '#00ff88']

const BT_KEYS = [
  ['Space / Enter', '재생 / 정지'],
  ['↑ (ArrowUp)', '속도 올리기'],
  ['↓ (ArrowDown)', '속도 내리기'],
  ['← (ArrowLeft)', '위로 이동'],
  ['→ (ArrowRight)', '아래로 이동'],
  ['Home', '처음으로'],
  ['End', '끝으로'],
]

function Slider({ label, value, min, max, step = 1, onChange, display }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/60 text-xs w-16 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-green-400"
      />
      <span className="text-white text-xs w-10 text-right">{display ?? value}</span>
    </div>
  )
}

function ColorRow({ label, value, presets, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/60 text-xs w-16 shrink-0">{label}</span>
      <div className="flex gap-1.5 flex-1">
        {presets.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="w-7 h-7 rounded-full border-2 shrink-0 transition-transform active:scale-90"
            style={{
              backgroundColor: c,
              borderColor: value === c ? '#4ade80' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-7 h-7 rounded-full border-0 cursor-pointer bg-transparent"
      />
    </div>
  )
}

export default function SettingsPanel({ onClose }) {
  const settings = useStore((state) => state.settings)
  const updateSettings = useStore((state) => state.updateSettings)

  const set = (key) => (val) => updateSettings({ [key]: val })

  const displaySpeed = Number.isInteger(settings.scrollSpeed)
    ? settings.scrollSpeed
    : settings.scrollSpeed.toFixed(1)

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-end" onClick={onClose}>
      <div
        className="bg-gray-900 rounded-t-2xl p-5 space-y-4 overflow-y-auto max-h-[85vh]"
        style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">설정</span>
          <button onClick={onClose} className="text-white/50 text-2xl leading-none">
            ×
          </button>
        </div>

        <Slider
          label="글자 크기"
          value={settings.fontSize}
          min={16}
          max={80}
          onChange={set('fontSize')}
          display={`${settings.fontSize}px`}
        />
        <Slider
          label="좌우 마진"
          value={settings.margin}
          min={0}
          max={120}
          onChange={set('margin')}
          display={`${settings.margin}px`}
        />
        <Slider
          label="줄 간격"
          value={settings.lineHeight}
          min={1.2}
          max={2.5}
          step={0.1}
          onChange={set('lineHeight')}
          display={settings.lineHeight.toFixed(1)}
        />
        <Slider
          label="스크롤 속도"
          value={settings.scrollSpeed}
          min={0.5}
          max={10}
          step={0.5}
          onChange={set('scrollSpeed')}
          display={displaySpeed}
        />

        <ColorRow
          label="배경색"
          value={settings.bgColor}
          presets={BG_PRESETS}
          onChange={set('bgColor')}
        />
        <ColorRow
          label="텍스트색"
          value={settings.textColor}
          presets={TEXT_PRESETS}
          onChange={set('textColor')}
        />

        <div className="flex gap-3">
          <button
            onClick={() => updateSettings({ flipH: !settings.flipH })}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
              settings.flipH
                ? 'bg-green-500 border-green-500 text-black'
                : 'border-white/20 text-white/70'
            }`}
          >
            ↔ 좌우 반전
          </button>
          <button
            onClick={() => updateSettings({ flipV: !settings.flipV })}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
              settings.flipV
                ? 'bg-green-500 border-green-500 text-black'
                : 'border-white/20 text-white/70'
            }`}
          >
            ↕ 상하 반전
          </button>
        </div>

        {/* 블루투스 리모콘 키 매핑 */}
        <div className="border-t border-white/10 pt-4">
          <p className="text-white/50 text-xs mb-3">블루투스 리모콘 키 매핑</p>
          <div className="space-y-1.5">
            {BT_KEYS.map(([key, action]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-white/40 text-xs font-mono bg-white/5 px-2 py-0.5 rounded">
                  {key}
                </span>
                <span className="text-white/60 text-xs">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
