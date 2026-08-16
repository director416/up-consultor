import React, { useState } from 'react';

export default function App() {
  const [language, setLanguage] = useState('es');
  const [formStep, setFormStep] = useState('closed');
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', founded: '', legal: '', accounting: '', problem: ''
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbylqXD-9HvqE2zjtroSQ-W6WuISrieqStu-9tzRBSE-MfjS8yWGoJ90GRNU0Y_At6e_/exec';

  const t = {
    es: {
      nav: { contact: 'Contacto' },
      hero: { headline: 'Finance Strategy para Startups que Quieren Escalar Rápido', subheadline: 'Transforma tus datos en decisiones. Entiende tu realidad financiera y optimiza cada inversión.', cta: 'Agenda tu Consulta Gratuita' },
      about: { title: 'Sobre Mí', bio: 'Cristian Upegui Benítez', description: 'Administrador de Empresas • Contador Público • Especialista en Gerencia Pública • Maestría en Dirección y Gestión Financiera', experience: '+5 años en Corporate Finance | +10 clientes nacionales e internacionales', mission: 'Acompaño a startups y empresas en crecimiento a entender, organizar y usar sus datos financieros como herramienta estratégica.' },
      services: { title: 'Servicios', intro: 'No solo hacemos dashboards. Transformamos cómo tu empresa entiende y usa sus datos financieros.', items: [
        { title: 'FP&A & Budgeting', desc: 'Procesos de presupuesto, análisis OPEX, ciclos de conversión de efectivo' },
        { title: 'Análisis & Dashboards', desc: 'Scorecards, reportes mensuales, proyecciones de 13 semanas, análisis de inventario' },
        { title: 'Valoración & Decisión', desc: 'Valuación empresarial, evaluador de proyectos, presentaciones ejecutivas' },
        { title: 'Transformación Financiera', desc: 'Implementación completa de procesos, capacitación de equipos, decisiones data-driven' }
      ]},
      cases: { title: 'Casos de Éxito', intro: 'Guardamos absoluta reserva de nuestros clientes. Aquí compartimos el impacto:', cases: [
        { industry: 'E-commerce B2C', team: 'Equipos de +50 personas', impact: 'Organización de datos, visibilidad financiera real, decisiones basadas en información', time: 'Transformación 6+ meses' },
        { industry: 'Servicios', team: 'Equipos de +50 personas', impact: 'Entendimiento profundo de inversiones y su eficiencia, reportes ejecutivos automáticos', time: 'Transformación 6+ meses' }
      ]},
      booking: { title: 'Agenda tu Consulta Gratuita', subtitle: '15 minutos para conocernos y entender tu desafío', questions: [
        { id: 'founded', label: '¿Cuánto tiempo lleva tu empresa funcionando?', options: ['Menos de 1 año', '1-2 años', '2-5 años', '5+ años'] },
        { id: 'legal', label: '¿Ya estás constituido legalmente?', options: ['Sí', 'No', 'En proceso'] },
        { id: 'accounting', label: '¿Ya manejas contabilidad?', options: ['Sí, contable dedicado', 'Sí, con herramientas básicas', 'No, tenemos que mejorar'] }
      ], confirm: 'Confirmar Reserva', confirmed: '¡Reserva Confirmada!', checkEmail: 'Revisa tu email para la confirmación' },
      footer: { email: 'director@upconsultor.com', rights: '© 2024 UP Consultor. Todos los derechos reservados.' }
    },
    en: {
      nav: { contact: 'Contact' },
      hero: { headline: 'Finance Strategy for Startups That Want to Scale Fast', subheadline: 'Transform your data into decisions. Understand your financial reality and optimize every investment.', cta: 'Book Your Free Consultation' },
      about: { title: 'About Me', bio: 'Cristian Upegui Benítez', description: 'Business Administrator • CPA • Public Management Specialist • Master\'s in Finance & Business Management', experience: '+5 years in Corporate Finance | +10 clients nationally and internationally', mission: 'I support startups and growing companies in understanding, organizing, and using their financial data as a strategic tool.' },
      services: { title: 'Services', intro: 'We don\'t just build dashboards. We transform how your company understands and uses its financial data.', items: [
        { title: 'FP&A & Budgeting', desc: 'Budget processes, OPEX analysis, cash conversion cycles' },
        { title: 'Analysis & Dashboards', desc: 'Scorecards, monthly reports, 13-week projections, inventory analysis' },
        { title: 'Valuation & Decision', desc: 'Company valuation, project evaluator, executive presentations' },
        { title: 'Financial Transformation', desc: 'Full process implementation, team training, data-driven decisions' }
      ]},
      cases: { title: 'Success Stories', intro: 'We maintain absolute confidentiality of our clients. Here\'s the impact:', cases: [
        { industry: 'E-commerce B2C', team: 'Teams of +50 people', impact: 'Data organization, real financial visibility, information-driven decisions', time: '6+ months transformation' },
        { industry: 'Services', team: 'Teams of +50 people', impact: 'Deep understanding of investments and their efficiency, automated executive reports', time: '6+ months transformation' }
      ]},
      booking: { title: 'Book Your Free Consultation', subtitle: '15 minutes to get to know each other and understand your challenge', questions: [
        { id: 'founded', label: 'How long has your company been operating?', options: ['Less than 1 year', '1-2 years', '2-5 years', '5+ years'] },
        { id: 'legal', label: 'Are you legally established?', options: ['Yes', 'No', 'In progress'] },
        { id: 'accounting', label: 'Do you manage accounting?', options: ['Yes, dedicated accountant', 'Yes, with basic tools', 'No, we need to improve'] }
      ], confirm: 'Confirm Booking', confirmed: 'Booking Confirmed!', checkEmail: 'Check your email for confirmation' },
      footer: { email: 'director@upconsultor.com', rights: '© 2024 UP Consultor. All rights reserved.' }
    }
  };

  const content = t[language];
  const availableSlots = [
    { date: 'Mon, Jan 20', times: ['09:00', '14:00', '16:00'] },
    { date: 'Tue, Jan 21', times: ['10:00', '15:00', '17:00'] },
    { date: 'Wed, Jan 22', times: ['09:00', '14:00', '16:30'] }
  ];

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    const bookingData = { ...formData, slot: selectedSlot, timestamp: new Date().toISOString() };
    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify(bookingData) });
      setFormStep('confirmation');
      setTimeout(() => { 
        setFormStep('closed'); 
        setFormData({ name: '', email: '', company: '', founded: '', legal: '', accounting: '', problem: '' });
        setSelectedSlot(null);
      }, 3000);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl" style={{color: '#1e3a8a'}}>UP Consultor</div>
          <div className="flex gap-2">
            <button onClick={() => setLanguage('es')} style={{background: language === 'es' ? '#1e3a8a' : 'transparent', color: language === 'es' ? 'white' : '#666', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '500'}}>ES</button>
            <button onClick={() => setLanguage('en')} style={{background: language === 'en' ? '#1e3a8a' : 'transparent', color: language === 'en' ? 'white' : '#666', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '500'}}>EN</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-32 text-white text-center" style={{background: 'linear-gradient(135deg, #1e3a8a 0%, #0891b2 100%)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6" style={{lineHeight: '1.2'}}>{content.hero.headline}</h1>
          <p className="text-xl mb-10 opacity-90">{content.hero.subheadline}</p>
          <button onClick={() => setFormStep('form')} style={{background: '#f97316', color: 'white', fontWeight: 'bold', padding: '16px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px'}}>{content.hero.cta}</button>
        </div>
      </section>

      {/* About */}
      <section className="py-20" style={{background: '#f9fafb'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-2" style={{color: '#1e3a8a'}}>{content.about.title}</h2>
          <p className="text-xl text-center text-gray-600 mb-12">{content.about.bio}</p>
          <div style={{background: 'white', borderRadius: '12px', padding: '32px', borderLeft: '4px solid #0891b2'}}>
            <p className="text-gray-700 mb-4">{content.about.description}</p>
            <p className="font-bold mb-4" style={{color: '#f97316'}}>{content.about.experience}</p>
            <p className="text-gray-700">{content.about.mission}</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4" style={{color: '#1e3a8a'}}>{content.services.title}</h2>
          <p className="text-xl text-center text-gray-600 mb-12">{content.services.intro}</p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px'}}>
            {content.services.items.map((s, i) => (
              <div key={i} style={{background: 'white', padding: '32px', borderRadius: '12px', border: '2px solid #f0f0f0'}}>
                <div style={{display: 'flex', gap: '16px'}}>
                  <div style={{width: '48px', height: '48px', background: '#1e3a8a', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0}}>{i+1}</div>
                  <div><h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '8px'}}>{s.title}</h3><p style={{color: '#666'}}>{s.desc}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20" style={{background: 'linear-gradient(to right, #f0f9ff, #ecf0ff)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4" style={{color: '#1e3a8a'}}>{content.cases.title}</h2>
          <p className="text-xl text-center text-gray-600 mb-12">{content.cases.intro}</p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px'}}>
            {content.cases.cases.map((c, i) => (
              <div key={i} style={{background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <p style={{fontWeight: 'bold', color: '#1e3a8a', marginBottom: '12px'}}>{c.industry}</p>
                <p style={{color: '#666', marginBottom: '16px'}}>{c.team}</p>
                <div style={{background: '#eff6ff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #0891b2', marginBottom: '16px'}}>
                  <p style={{color: '#333', fontWeight: '500'}}>{c.impact}</p>
                </div>
                <p style={{fontSize: '14px', color: '#999'}}>{c.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {formStep !== 'closed' && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
          <div style={{background: 'white', borderRadius: '16px', maxWidth: '600px', width: '100%', padding: '32px', maxHeight: '90vh', overflowY: 'auto'}}>
            
            {formStep === 'form' && (
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{color: '#1e3a8a'}}>{content.booking.title}</h2>
                <p style={{color: '#666', marginBottom: '32px'}}>{content.booking.subtitle}</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px'}}>
                  <input type="text" placeholder={language === 'es' ? 'Tu nombre' : 'Your name'} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px'}} />
                  <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px'}} />
                  <input type="text" placeholder={language === 'es' ? 'Empresa' : 'Company'} value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} style={{padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px'}} />
                  {content.booking.questions.map(q => (
                    <div key={q.id}>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px'}}>{q.label}</label>
                      <select value={formData[q.id]} onChange={(e) => setFormData({...formData, [q.id]: e.target.value})} style={{width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px'}}>
                        <option value="">{language === 'es' ? 'Selecciona...' : 'Select...'}</option>
                        {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px'}}>{language === 'es' ? '¿Cuál es tu principal problema financiero?' : 'What is your main financial problem?'}</label>
                    <textarea placeholder={language === 'es' ? 'Cuéntame...' : 'Tell me...'} value={formData.problem} onChange={(e) => setFormData({...formData, problem: e.target.value})} rows="3" style={{width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', fontFamily: 'inherit'}} />
                  </div>
                </div>
                <div style={{display: 'flex', gap: '16px'}}>
                  <button onClick={() => setFormStep('closed')} style={{flex: 1, padding: '12px 16px', border: '2px solid #e5e7eb', color: '#333', fontWeight: 'bold', borderRadius: '8px', background: 'white', cursor: 'pointer'}}>{language === 'es' ? 'Cancelar' : 'Cancel'}</button>
                  <button onClick={() => setFormStep('calendar')} style={{flex: 1, padding: '12px 16px', background: '#f97316', color: 'white', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer'}}>{language === 'es' ? 'Siguiente' : 'Next'}</button>
                </div>
              </div>
            )}

            {formStep === 'calendar' && (
              <div>
                <h2 className="text-3xl font-bold mb-8" style={{color: '#1e3a8a'}}>{language === 'es' ? 'Selecciona tu horario' : 'Select Your Time'}</h2>
                <div style={{marginBottom: '32px'}}>
                  {availableSlots.map((day, i) => (
                    <div key={i} style={{marginBottom: '24px'}}>
                      <p style={{fontWeight: 'bold', color: '#1e3a8a', marginBottom: '12px'}}>{day.date}</p>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px'}}>
                        {day.times.map(time => (
                          <button key={time} onClick={() => setSelectedSlot(`${day.date} ${time}`)} style={{padding: '8px 12px', borderRadius: '8px', fontWeight: '500', border: selectedSlot === `${day.date} ${time}` ? 'none' : '2px solid #e5e7eb', background: selectedSlot === `${day.date} ${time}` ? '#1e3a8a' : 'white', color: selectedSlot === `${day.date} ${time}` ? 'white' : '#333', cursor: 'pointer'}}>{time}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display: 'flex', gap: '16px'}}>
                  <button onClick={() => setFormStep('form')} style={{flex: 1, padding: '12px 16px', border: '2px solid #e5e7eb', color: '#333', fontWeight: 'bold', borderRadius: '8px', background: 'white', cursor: 'pointer'}}>{language === 'es' ? 'Atrás' : 'Back'}</button>
                  <button onClick={handleConfirmBooking} disabled={loading} style={{flex: 1, padding: '12px 16px', background: '#f97316', color: 'white', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1}}>{loading ? (language === 'es' ? 'Enviando...' : 'Sending...') : content.booking.confirm}</button>
                </div>
              </div>
            )}

            {formStep === 'confirmation' && (
              <div style={{textAlign: 'center', padding: '32px 0'}}>
                <div style={{width: '64px', height: '64px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '32px'}}>✓</div>
                <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{color: '#1e3a8a'}}>{content.booking.confirmed}</h2>
                <p style={{color: '#666'}}>{content.booking.checkEmail}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{background: '#1e3a8a', color: 'white', padding: '48px 24px', textAlign: 'center'}}>
        <p style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>UP Consultor</p>
        <p style={{color: '#cffafe', marginBottom: '16px'}}>{content.footer.email}</p>
        <p style={{color: '#a5b4fc', fontSize: '14px'}}>{content.footer.rights}</p>
      </footer>
    </div>
  );
}
