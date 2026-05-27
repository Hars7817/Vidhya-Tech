export function SocialShareImage() {
  const pillStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 18px',
    borderRadius: '999px',
    background: 'rgba(255, 204, 0, 0.12)',
    border: '1px solid rgba(255, 204, 0, 0.4)',
    color: '#ffdb55',
    fontSize: '22px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
  } as const;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top right, rgba(255, 204, 0, 0.24), transparent 28%), linear-gradient(135deg, #050505 0%, #101010 48%, #1a1400 100%)',
        color: '#ffffff',
        padding: '72px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04), transparent 28%), radial-gradient(circle at bottom left, rgba(255,204,0,0.14), transparent 28%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '24px',
              background: '#ffcc00',
              color: '#050505',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '38px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              boxShadow: '0 0 60px rgba(255, 204, 0, 0.35)',
            }}
          >
            VT
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#ffcc00',
              }}
            >
              Vidhya Tech
            </div>
            <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.74)' }}>
              Premium digital systems for ambitious brands
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            maxWidth: '860px',
          }}
        >
          <div
            style={{
              fontSize: '74px',
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: '-0.05em',
            }}
          >
            Web Development, AI Automation & Growth
          </div>

          <div
            style={{
              marginTop: '28px',
              fontSize: '30px',
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '760px',
            }}
          >
            SEO-ready websites, conversion-focused design, and automation built
            to help businesses grow.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '24px',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <span style={pillStyle}>Websites</span>
            <span style={pillStyle}>AI Systems</span>
            <span style={pillStyle}>Marketing</span>
            <span style={pillStyle}>Software</span>
          </div>

          <div style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.84)' }}>
            vidhyatech1@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
