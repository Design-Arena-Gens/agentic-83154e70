'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [config, setConfig] = useState({
    emailProvider: 'gmail',
    email: '',
    emailPassword: '',
    whatsappNumber: '',
    openaiKey: '',
    resumeUrl: '',
    coverLetterTemplate: '',
  });

  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    emailsProcessed: 0,
    scholarshipsApplied: 0,
    jobsApplied: 0,
    notifications: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        addLog('✅ Configuration saved successfully');
        setIsActive(true);
        startMonitoring();
      } else {
        addLog('❌ Failed to save configuration');
      }
    } catch (error) {
      addLog('❌ Error: ' + (error as Error).message);
    }
  };

  const startMonitoring = async () => {
    addLog('🚀 Starting email monitoring...');

    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/process-emails', {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();

          if (data.processed > 0) {
            setStats(prev => ({
              emailsProcessed: prev.emailsProcessed + data.processed,
              scholarshipsApplied: prev.scholarshipsApplied + (data.scholarships || 0),
              jobsApplied: prev.jobsApplied + (data.jobs || 0),
              notifications: prev.notifications + (data.notifications || 0),
            }));

            data.logs?.forEach((log: string) => addLog(log));
          }
        }
      } catch (error) {
        console.error('Monitoring error:', error);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 50));
  };

  const testWhatsApp = async () => {
    try {
      const response = await fetch('/api/test-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: config.whatsappNumber }),
      });

      if (response.ok) {
        addLog('✅ WhatsApp test message sent');
      } else {
        addLog('❌ WhatsApp test failed');
      }
    } catch (error) {
      addLog('❌ Error: ' + (error as Error).message);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>📧 Email Automation Agent</h1>
        <p className={styles.description}>
          Automatically apply to scholarships and jobs from your emails
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>⚙️ Configuration</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Email Provider</label>
                <select
                  value={config.emailProvider}
                  onChange={(e) => setConfig({...config, emailProvider: e.target.value})}
                  className={styles.input}
                >
                  <option value="gmail">Gmail</option>
                  <option value="outlook">Outlook</option>
                  <option value="yahoo">Yahoo</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => setConfig({...config, email: e.target.value})}
                  className={styles.input}
                  placeholder="your.email@gmail.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email App Password</label>
                <input
                  type="password"
                  value={config.emailPassword}
                  onChange={(e) => setConfig({...config, emailPassword: e.target.value})}
                  className={styles.input}
                  placeholder="Your app-specific password"
                  required
                />
                <small>Generate an app password in your email settings</small>
              </div>

              <div className={styles.formGroup}>
                <label>WhatsApp Number</label>
                <input
                  type="tel"
                  value={config.whatsappNumber}
                  onChange={(e) => setConfig({...config, whatsappNumber: e.target.value})}
                  className={styles.input}
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>OpenAI API Key</label>
                <input
                  type="password"
                  value={config.openaiKey}
                  onChange={(e) => setConfig({...config, openaiKey: e.target.value})}
                  className={styles.input}
                  placeholder="sk-..."
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Resume URL</label>
                <input
                  type="url"
                  value={config.resumeUrl}
                  onChange={(e) => setConfig({...config, resumeUrl: e.target.value})}
                  className={styles.input}
                  placeholder="https://example.com/resume.pdf"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Cover Letter Template</label>
                <textarea
                  value={config.coverLetterTemplate}
                  onChange={(e) => setConfig({...config, coverLetterTemplate: e.target.value})}
                  className={styles.textarea}
                  placeholder="Enter your cover letter template..."
                  rows={4}
                />
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.button}>
                  {isActive ? '✓ Active' : 'Start Agent'}
                </button>
                <button type="button" onClick={testWhatsApp} className={styles.buttonSecondary}>
                  Test WhatsApp
                </button>
              </div>
            </form>
          </div>

          <div className={styles.card}>
            <h2>📊 Statistics</h2>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>{stats.emailsProcessed}</div>
                <div className={styles.statLabel}>Emails Processed</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{stats.scholarshipsApplied}</div>
                <div className={styles.statLabel}>Scholarships Applied</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{stats.jobsApplied}</div>
                <div className={styles.statLabel}>Jobs Applied</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{stats.notifications}</div>
                <div className={styles.statLabel}>Notifications Sent</div>
              </div>
            </div>

            <h2 style={{marginTop: '2rem'}}>📝 Activity Log</h2>
            <div className={styles.logs}>
              {logs.length === 0 ? (
                <p className={styles.noLogs}>No activity yet. Configure and start the agent.</p>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={styles.logEntry}>{log}</div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <h3>🔒 Privacy & Security</h3>
          <p>Your credentials are stored securely and never shared. The agent runs on your behalf.</p>
          <h3>📋 How It Works</h3>
          <ol>
            <li>Agent monitors your email inbox every 30 seconds</li>
            <li>AI analyzes emails to identify scholarships and job opportunities</li>
            <li>Automatically fills applications using your resume and cover letter</li>
            <li>Sends you WhatsApp notifications for each application submitted</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
