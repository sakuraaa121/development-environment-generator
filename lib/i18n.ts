export type LanguageCode = 'ja' | 'en';

export interface Translations {
  common: {
    title: string;
    subtitle: string;
    configuration: string;
    selectYourEnvironment: string;
    baseOS: string;
    containerTechnology: string;
    webServer: string;
    programmingLanguages: string;
    framework: string;
    sslTls: string;
    configurationSummary: string;
    generatedCommand: string;
    copyAndPaste: string;
    copy: string;
    copied: string;
    docker: string;
    dockerCompose: string;
    ubuntuNative: string;
    wslWindows: string;
    virtualbox: string;
    macos: string;
    none: string;
    nginx: string;
    apache: string;
    python: string;
    nodejs: string;
    go: string;
    cpp: string;
    rust: string;
    english: string;
    japanese: string;
  };
  commands: {
    startSetup: string;
    installWSL: string;
    afterWSLInstallation: string;
    virtualBoxHostSetup: string;
    virtualBoxGuestSetup: string;
    installBrew: string;
    updateSystemPackages: string;
    installDocker: string;
    installDockerCompose: string;
    installNginx: string;
    installApache: string;
    installPython: string;
    installNodejs: string;
    installGo: string;
    installCpp: string;
    installRust: string;
    installAdditionalTools: string;
    installPostgreSQL: string;
    installMySQL: string;
    installRedis: string;
    setupCompleted: string;
    cleanupCompleted: string;
    startCleanup: string;
    uninstallDocker: string;
    uninstallNginx: string;
    uninstallApache: string;
    uninstallPython: string;
    uninstallNodejs: string;
    uninstallGo: string;
    uninstallCpp: string;
    uninstallRust: string;
    uninstallPostgreSQL: string;
    uninstallMySQL: string;
    uninstallRedis: string;
    environmentInfo: string;
    osInfo: string;
    bashVersion: string;
    pythonVersion: string;
    nodeVersion: string;
    npmVersion: string;
    goVersion: string;
    instructions1: string;
    instructions2: string;
    instructions3: string;
    setupSSLCertbotInfo: string;
    setupFrameworkInfo: string;
  };
  labels: {
    os: string;
    dockerEnabled: string;
    dockerComposeEnabled: string;
    webServerLabel: string;
    languages: string;
    frameworkLabel: string;
    sslEnabled: string;
    databases: string;
    postgresqlEnabled: string;
    mysqlEnabled: string;
    redisEnabled: string;
  };
  ui: {
    setupTab: string;
    cleanupTab: string;
    database: string;
    postgresql: string;
    mysql: string;
    redis: string;
  };
  ai: {
    title: string;
    description: string;
    apiKeyPlaceholder: string;
    promptPlaceholder: string;
    button: string;
    buttonLoading: string;
    requireApiKey: string;
    requirePrompt: string;
    successToast: string;
    errorToastTitle: string;
    errorToastDesc: string;
    getKeyLink: string;
  };
  steps: {
    wslStep1Title: string;
    wslStep1Description: string;
    wslStep2Title: string;
    wslStep2Description: string;
    ubuntuStep1Title: string;
    ubuntuStep1Description: string;
    vboxStep1Title: string;
    vboxStep1Description: string;
    vboxStep2Title: string;
    vboxStep2Description: string;
    macosStep1Title: string;
    macosStep1Description: string;
    macosStep2Title: string;
    macosStep2Description: string;
    cleanupStepTitle: string;
    cleanupStepDescription: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  ja: {
    common: {
      title: 'Dev Setup Commander',
      subtitle: '開発環境構築のターミナルコマンドを自動生成',
      configuration: '設定',
      selectYourEnvironment: '環境とツールを選択してください',
      baseOS: 'ベースOS',
      containerTechnology: 'コンテナ技術',
      webServer: 'Webサーバー',
      programmingLanguages: 'プログラミング言語',
      framework: 'フレームワーク',
      sslTls: 'SSL/TLS (HTTPS)',
      configurationSummary: '設定サマリー',
      generatedCommand: '生成されたコマンド',
      copyAndPaste: 'ターミナルにコピペして実行してください',
      copy: 'コピー',
      copied: 'コピーしました！',
      docker: 'Docker',
      dockerCompose: 'Docker Compose',
      ubuntuNative: 'Ubuntu (ネイティブ)',
      wslWindows: 'WSL (Windows)',
      virtualbox: 'VirtualBox',
      macos: 'macOS',
      none: 'なし',
      nginx: 'Nginx',
      apache: 'Apache',
      python: 'Python',
      nodejs: 'Node.js',
      go: 'Go',
      cpp: 'C/C++',
      rust: 'Rust',
      english: 'English',
      japanese: '日本語',
    },
    commands: {
      startSetup: '🚀 開発環境のセットアップを開始しています...',
      installWSL: '# WSL をインストール（Windows PowerShell を管理者として実行）',
      afterWSLInstallation: '# WSL インストール後、Ubuntu ターミナルで以下を実行してください：',
      virtualBoxHostSetup: '# 1. Host PCにVirtualBoxをインストールしてください',
      virtualBoxGuestSetup: '# 2. UbuntuをゲストOSとしてインストールし、そのターミナルで以下を実行してください',
      installBrew: '# Homebrew と Command Line Tools をインストール',
      updateSystemPackages: '# システムパッケージを更新',
      installDocker: '# Docker をインストール',
      installDockerCompose: '# Docker Compose をインストール',
      installNginx: '# Nginx をインストール',
      installApache: '# Apache をインストール',
      installPython: '# Python をインストール',
      installNodejs: '# Node.js をインストール',
      installGo: '# Go をインストール',
      installCpp: '# C/C++ をインストール',
      installRust: '# Rust をインストール',
      installAdditionalTools: '# 追加の開発ツールをインストール',
      installPostgreSQL: '# PostgreSQL をインストール',
      installMySQL: '# MySQL をインストール',
      installRedis: '# Redis をインストール',
      setupCompleted: '✅ 開発環境のセットアップが完了しました！',
      startCleanup: '🧹 環境のクリーンアップを開始しています...',
      uninstallDocker: '# Docker をアンインストール',
      uninstallNginx: '# Nginx をアンインストール',
      uninstallApache: '# Apache をアンインストール',
      uninstallPython: '# Python をアンインストール',
      uninstallNodejs: '# Node.js をアンインストール',
      uninstallGo: '# Go をアンインストール',
      uninstallCpp: '# C/C++ をアンインストール',
      uninstallRust: '# Rust をアンインストール',
      uninstallPostgreSQL: '# PostgreSQL をアンインストール',
      uninstallMySQL: '# MySQL をアンインストール',
      uninstallRedis: '# Redis をアンインストール',
      cleanupCompleted: '✅ 環境のクリーンアップが完了しました！',
      environmentInfo: '📝 環境情報：',
      osInfo: 'OS: $(uname -a)',
      bashVersion: 'Bash バージョン: $BASH_VERSION',
      pythonVersion: 'Python: $(python3 --version)',
      nodeVersion: 'Node.js: $(node --version)',
      npmVersion: 'npm: $(npm --version)',
      goVersion: 'Go: $(go version)',
      instructions1: '1. 「コピー」ボタンをクリックしてコマンドをコピー',
      instructions2: '2. ターミナルを開いてコマンドをペースト',
      instructions3: '3. 実行: bash setup.sh',
      setupSSLCertbotInfo: '# SSL/TLS証明書 (Certbot) をインストール',
      setupFrameworkInfo: '# フレームワークの初期構築を実行',
    },
    labels: {
      os: '• OS: ',
      dockerEnabled: '• Docker 有効',
      dockerComposeEnabled: '• Docker Compose 有効',
      webServerLabel: '• Webサーバー: ',
      languages: '• 言語: ',
      frameworkLabel: '• フレームワーク: ',
      sslEnabled: '• SSL/TLS 有効',
      databases: '• データベース: ',
      postgresqlEnabled: '• PostgreSQL 有効',
      mysqlEnabled: '• MySQL 有効',
      redisEnabled: '• Redis 有効',
    },
    ui: {
      setupTab: 'セットアップ',
      cleanupTab: 'クリーンアップ',
      database: 'データベース',
      postgresql: 'PostgreSQL',
      mysql: 'MySQL',
      redis: 'Redis',
    },
    ai: {
      title: 'AIアーキテクチャ提案機能',
      description: '作りたいアプリの要件を伝えると、Gemini AIが最適な環境構成を提案し、下の設定に自動反映します。',
      apiKeyPlaceholder: 'Gemini API Keyを入力...',
      promptPlaceholder: '作りたいアプリの要件を教えてください（例：リアルタイムのチャットアプリ）',
      button: 'AIに構成を提案してもらう',
      buttonLoading: 'AIに構成を提案させています...',
      requireApiKey: 'APIキーを入力してください',
      requirePrompt: '作りたいアプリの要件を入力してください',
      successToast: 'AIからの提案を適用しました！',
      errorToastTitle: 'AIからの提案取得に失敗しました',
      errorToastDesc: 'JSONの解析、もしくはAPIの呼び出しに失敗しました。',
      getKeyLink: 'APIキーをお持ちでない方はこちら（Google AI Studio）',
    },
    steps: {
      wslStep1Title: 'Step 1: WSL をインストール',
      wslStep1Description: 'Windows PowerShell を管理者権限で開き、以下のコマンドを実行してください。',
      wslStep2Title: 'Step 2: Ubuntu でセットアップスクリプトを実行',
      wslStep2Description: 'PCを再起動して Ubuntu のターミナルを開き、以下のコマンドを実行してください。自動的に setup.sh が作成され、セットアップが開始されます。',
      ubuntuStep1Title: 'Step 1: セットアップスクリプトを実行',
      ubuntuStep1Description: 'ターミナルを開き、以下のコマンドを実行してください。自動的に setup.sh が作成され、セットアップが開始されます。',
      vboxStep1Title: 'Step 1: VirtualBox と Ubuntu をインストール',
      vboxStep1Description: '公式サイト (https://www.virtualbox.org/) から VirtualBox をダウンロードしてインストール後、Ubuntu をゲストOSとしてセットアップしてください。',
      vboxStep2Title: 'Step 2: Ubuntu でセットアップスクリプトを実行',
      vboxStep2Description: 'Ubuntu のターミナルを開き、以下のコマンドを実行してください。自動的に setup.sh が作成され、セットアップが開始されます。',
      macosStep1Title: 'Step 1: Homebrew をインストール',
      macosStep1Description: 'Macのターミナル（Terminal.app）を開き、Command Line ToolsとHomebrewが未インストールの場合は以下のコマンドでインストールしてください。',
      macosStep2Title: 'Step 2: セットアップスクリプトを実行',
      macosStep2Description: '続いて、以下のコマンドをターミナルに貼り付けて実行してください。自動的に setup.sh が作成され、各ツールのインストールが開始されます。',
      cleanupStepTitle: 'Step 1: クリーンアップスクリプトを実行',
      cleanupStepDescription: 'ターミナルを開き、以下のコマンドを実行してください。自動的に cleanup.sh が作成され、環境のクリーンアップ（削除）が開始されます。',
    },
  },
  en: {
    common: {
      title: 'Dev Setup Commander',
      subtitle: 'Generate terminal commands for your development environment',
      configuration: 'Configuration',
      selectYourEnvironment: 'Select your environment and tools',
      baseOS: 'Base Operating System',
      containerTechnology: 'Container Technology',
      webServer: 'Web Server',
      programmingLanguages: 'Programming Languages',
      framework: 'Framework',
      sslTls: 'SSL/TLS (HTTPS)',
      configurationSummary: 'Configuration Summary',
      generatedCommand: 'Generated Command',
      copyAndPaste: 'Copy and paste into your terminal',
      copy: 'Copy',
      copied: 'Copied!',
      docker: 'Docker',
      dockerCompose: 'Docker Compose',
      ubuntuNative: 'Ubuntu (Native)',
      wslWindows: 'WSL (Windows)',
      virtualbox: 'VirtualBox',
      macos: 'macOS',
      none: 'None',
      nginx: 'Nginx',
      apache: 'Apache',
      python: 'Python',
      nodejs: 'Node.js',
      go: 'Go',
      cpp: 'C/C++',
      rust: 'Rust',
      english: 'English',
      japanese: '日本語',
    },
    commands: {
      startSetup: '🚀 Starting development environment setup...',
      installWSL: '# Install WSL (run on Windows PowerShell as Administrator)',
      afterWSLInstallation: '# After WSL installation, run this on Ubuntu terminal:',
      virtualBoxHostSetup: '# 1. Install VirtualBox on your Host PC',
      virtualBoxGuestSetup: '# 2. Install Ubuntu as guest OS and run the following in its terminal:',
      installBrew: '# Install Homebrew and Command Line Tools',
      updateSystemPackages: '# Update system packages',
      installDocker: '# Install Docker',
      installDockerCompose: '# Install Docker Compose',
      installNginx: '# Install Nginx',
      installApache: '# Install Apache',
      installPython: '# Install Python',
      installNodejs: '# Install Node.js',
      installGo: '# Install Go',
      installCpp: '# Install C/C++',
      installRust: '# Install Rust',
      installAdditionalTools: '# Install additional development tools',
      installPostgreSQL: '# Install PostgreSQL',
      installMySQL: '# Install MySQL',
      installRedis: '# Install Redis',
      setupCompleted: '✅ Development environment setup completed!',
      startCleanup: '🧹 Starting environment cleanup...',
      uninstallDocker: '# Uninstall Docker',
      uninstallNginx: '# Uninstall Nginx',
      uninstallApache: '# Uninstall Apache',
      uninstallPython: '# Uninstall Python',
      uninstallNodejs: '# Uninstall Node.js',
      uninstallGo: '# Uninstall Go',
      uninstallCpp: '# Uninstall C/C++',
      uninstallRust: '# Uninstall Rust',
      uninstallPostgreSQL: '# Uninstall PostgreSQL',
      uninstallMySQL: '# Uninstall MySQL',
      uninstallRedis: '# Uninstall Redis',
      cleanupCompleted: '✅ Environment cleanup completed!',
      environmentInfo: '📝 Environment info:',
      osInfo: 'OS: $(uname -a)',
      bashVersion: 'Bash version: $BASH_VERSION',
      pythonVersion: 'Python: $(python3 --version)',
      nodeVersion: 'Node.js: $(node --version)',
      npmVersion: 'npm: $(npm --version)',
      goVersion: 'Go: $(go version)',
      instructions1: '1. Click the "Copy" button to copy all commands',
      instructions2: '2. Open your terminal and paste the commands',
      instructions3: '3. Run: bash setup.sh',
      setupSSLCertbotInfo: '# Install SSL/TLS certificate (Certbot)',
      setupFrameworkInfo: '# Run framework initial setup',
    },
    labels: {
      os: '• OS: ',
      dockerEnabled: '• Docker enabled',
      dockerComposeEnabled: '• Docker Compose enabled',
      webServerLabel: '• Web Server: ',
      languages: '• Languages: ',
      frameworkLabel: '• Framework: ',
      sslEnabled: '• SSL/TLS enabled',
      databases: '• Databases: ',
      postgresqlEnabled: '• PostgreSQL enabled',
      mysqlEnabled: '• MySQL enabled',
      redisEnabled: '• Redis enabled',
    },
    ui: {
      setupTab: 'Setup',
      cleanupTab: 'Cleanup',
      database: 'Database',
      postgresql: 'PostgreSQL',
      mysql: 'MySQL',
      redis: 'Redis',
    },
    ai: {
      title: 'AI Architecture Suggestion',
      description: 'Tell the AI what kind of app you want to build, and Gemini AI will propose the optimal environment configuration and automatically apply it below.',
      apiKeyPlaceholder: 'Enter Gemini API Key...',
      promptPlaceholder: 'Describe the app requirements (e.g., real-time chat app)',
      button: 'Ask AI for configuration',
      buttonLoading: 'AI is generating configuration...',
      requireApiKey: 'Please enter your API Key',
      requirePrompt: 'Please enter the app requirements',
      successToast: 'AI suggestion applied successfully!',
      errorToastTitle: 'Failed to get AI suggestion',
      errorToastDesc: 'Failed to parse JSON or call the API.',
      getKeyLink: 'Get an API Key here (Google AI Studio)',
    },
    steps: {
      wslStep1Title: 'Step 1: Install WSL',
      wslStep1Description: 'Open Windows PowerShell as Administrator and run the following command.',
      wslStep2Title: 'Step 2: Run setup script on Ubuntu',
      wslStep2Description: 'Restart your PC, open the Ubuntu terminal, and run the following command. The setup.sh script will be created automatically and setup will begin.',
      ubuntuStep1Title: 'Step 1: Run setup script',
      ubuntuStep1Description: 'Open your terminal and run the following command. The setup.sh script will be created automatically and setup will begin.',
      vboxStep1Title: 'Step 1: Install VirtualBox and Ubuntu',
      vboxStep1Description: 'Download and install VirtualBox from the official website (https://www.virtualbox.org/), then set up Ubuntu as the guest OS.',
      vboxStep2Title: 'Step 2: Run setup script on Ubuntu',
      vboxStep2Description: 'Open the Ubuntu terminal and run the following command. The setup.sh script will be created automatically and setup will begin.',
      macosStep1Title: 'Step 1: Install Homebrew',
      macosStep1Description: 'Open Terminal.app and if Command Line Tools and Homebrew are not installed, run the following command to install them.',
      macosStep2Title: 'Step 2: Run setup script',
      macosStep2Description: 'Next, copy and paste the following command into your terminal and run it. The setup.sh script will be created automatically and tool installation will begin.',
      cleanupStepTitle: 'Step 1: Run cleanup script',
      cleanupStepDescription: 'Open your terminal and run the following command. The cleanup.sh script will be created automatically and environment cleanup will begin.',
    },
  },
};

export function getTranslation(lang: LanguageCode): Translations {
  return translations[lang];
}
