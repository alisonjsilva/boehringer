# Memory Game - Google Sheets Edition

Jogo da Memória (Memory Pairs Game) que utiliza **Google Sheets** como base de dados em vez de Supabase.

## Pré-requisitos

- Node.js 18+
- Uma conta Google com acesso ao Google Cloud Console
- npm ou pnpm

## Configuração do Google Sheets

### 1. Criar um Projeto no Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Sheets API**:
   - Vá em **APIs & Services > Library**
   - Pesquise por "Google Sheets API"
   - Clique em **Enable**

### 2. Criar uma Service Account

1. Vá em **APIs & Services > Credentials**
2. Clique em **Create Credentials > Service Account**
3. Dê um nome (ex: `memory-game-sheets`)
4. Clique em **Done**
5. Na lista de Service Accounts, clique na que acabou de criar
6. Vá na aba **Keys**
7. Clique em **Add Key > Create New Key**
8. Selecione **JSON** e clique em **Create**
9. Um arquivo JSON será baixado — guarde-o com segurança

### 3. Criar a Planilha (Spreadsheet)

1. Acesse [Google Sheets](https://sheets.google.com/)
2. Crie uma nova planilha
3. Renomeie-a para algo como "Memory Game Database"
4. Crie **3 abas** (sheets/tabs) com os seguintes nomes exatos:

#### Aba `users`
Na primeira linha (cabeçalho), coloque:
| A | B | C | D | E |
|---|---|---|---|---|
| id | name | email | phone | created_at |

#### Aba `ranking`
Na primeira linha (cabeçalho), coloque:
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| id | name | userid | moves | time | day | ranking_date |

#### Aba `legal_texts`
Na primeira linha (cabeçalho), coloque:
| A | B |
|---|---|
| day | text |

Adicione os textos legais para cada dia:
| day | text |
|-----|------|
| 1 | Seu texto legal para o dia 1... |
| 2 | Seu texto legal para o dia 2... |
| 3 | Seu texto legal para o dia 3... |

### 4. Compartilhar a Planilha com a Service Account

1. Copie o email da Service Account (encontra-se no arquivo JSON baixado, campo `client_email`)
2. Na planilha do Google Sheets, clique em **Compartilhar**
3. Cole o email da Service Account
4. Dê permissão de **Editor**
5. Clique em **Enviar**

### 5. Obter o ID da Planilha

O ID da planilha está na URL:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_AQUI/edit
```

Copie o trecho entre `/d/` e `/edit`.

## Configuração do Projeto

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=seu-service-account@seu-projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=id-da-sua-planilha
```

> **Importante:** O valor de `GOOGLE_PRIVATE_KEY` deve ser copiado do arquivo JSON baixado (campo `private_key`). Mantenha as aspas duplas e os `\n`.

### 2. Instalar Dependências

```bash
npm install
```

### 3. Rodar em Desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:3000`.

## Estrutura da Planilha

### Sheet: `users`
Armazena os jogadores registrados.

| Coluna | Descrição |
|--------|-----------|
| id | ID único gerado automaticamente |
| name | Nome/nickname do jogador |
| email | Email (opcional) |
| phone | Telefone (opcional) |
| created_at | Data de criação |

### Sheet: `ranking`
Armazena os resultados dos jogos.

| Coluna | Descrição |
|--------|-----------|
| id | ID único gerado automaticamente |
| name | Nome do jogador |
| userid | ID do jogador (referência à sheet users) |
| moves | Número de jogadas |
| time | Tempo em segundos |
| day | Dia do jogo (1, 2, 3) |
| ranking_date | Data/hora do registro |

### Sheet: `legal_texts`
Textos legais exibidos no rodapé do jogo.

| Coluna | Descrição |
|--------|-----------|
| day | Número do dia |
| text | Texto legal completo |

## Deploy na Vercel

1. Faça push do projeto para um repositório Git
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente no painel da Vercel:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SPREADSHEET_ID`
4. Deploy!

> **Nota:** Na Vercel, o `GOOGLE_PRIVATE_KEY` deve ser colado sem as aspas externas, mantendo apenas o conteúdo da chave com os `\n`.

## Diferenças em Relação à Versão Supabase

| Aspecto | Supabase | Google Sheets |
|---------|----------|---------------|
| Base de dados | PostgreSQL | Google Sheets (planilha) |
| Autenticação | Supabase Auth / Service Role | Google Service Account |
| Pacote | `@supabase/supabase-js` | `googleapis` |
| Queries | SQL-like via SDK | Google Sheets API v4 |
| Performance | Alta (banco dedicado) | Moderada (API REST) |
| Custo | Free tier limitado | Gratuito (limites generosos da API) |
| Ideal para | Produção com alta carga | Projetos pequenos/eventos |

## Limites da Google Sheets API

- **Leitura:** 300 requisições por minuto por projeto
- **Escrita:** 300 requisições por minuto por projeto
- **Células:** Máximo de 10 milhões de células por planilha

Para um jogo de evento com poucos participantes simultâneos, estes limites são mais que suficientes.

## Troubleshooting

### Erro "The caller does not have permission"
- Verifique se a planilha foi compartilhada com o email da Service Account
- Verifique se o `GOOGLE_SPREADSHEET_ID` está correto

### Erro "Unable to parse range"
- Verifique se as abas da planilha estão nomeadas exatamente como: `users`, `ranking`, `legal_texts`

### Erro de PRIVATE_KEY
- Certifique-se de que a chave privada está entre aspas duplas no `.env.local`
- Os `\n` devem estar presentes (não substituídos por quebras de linha reais no .env)
