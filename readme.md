# Uralyt-u Control Schedule

**uralyt-u** é uma aplicação móvel desenvolvida com React Native e Expo para controle de administração de doses de [uralyt-u](). A aplicação tem como objetivo facilitar a inserção de doses tomadas e acompanhar o progresso de forma eficaz.

## Funcionalidades

- **Inserção de Doses:** Permite aos usuários registrar as doses tomadas de forma simples e intuitiva.
- **Visualização de Progresso:** Oferece uma visão detalhada do andamento das doses administradas, ajudando a monitorar o progresso.

## Tecnologias Utilizadas

- **React Native:** Biblioteca para desenvolvimento de aplicativos móveis nativos utilizando JavaScript e React.
- **Expo:** Ferramenta que facilita o desenvolvimento e a construção de aplicativos React Native, oferecendo um ambiente de desenvolvimento otimizado.
- **React Navigation:** Biblioteca para navegação entre telas em aplicativos React Native.

## Instalação

1. **Clone o Repositório:**

    ```bash
    git clone https://github.com/seu-usuario/uralyt-u.git
    ```

2. **Navegue para o Diretório do Projeto:**

    ```bash
    cd uralyt-u
    ```

3. **Instale as Dependências:**

    ```bash
    npm install
    ```

4. **Inicie o Projeto:**

    ```bash
    npm start
    ```

    Ou, se preferir utilizar o Expo CLI diretamente:

    ```bash
    expo start
    ```

## Configuração

Para configurar o projeto, você pode precisar definir algumas variáveis de ambiente e fazer ajustes específicos no arquivo `app.json` para corresponder às suas necessidades de configuração.

## Estrutura do Projeto

- **/src:** Contém o código-fonte da aplicação.
  - **/components:** Componentes reutilizáveis da aplicação.
  - **/screens:** Telas da aplicação.
  - **/redux:** Arquivos relacionados ao Redux.
  - **/utils:** Funções utilitárias e helpers.

- **/assets:** Recursos estáticos como imagens e fontes.

- **/config:** Configurações da aplicação, como variáveis de ambiente.

### Versionamento Automático

O versionamento do projeto é realizado de forma automática usando o **`semantic-release`**, que gera as versões com base nas mensagens dos commits, seguindo a convenção **[Conventional Commits](https://www.conventionalcommits.org/)**.

#### Convenção de Commits

- `feat: <descrição>` - Para adicionar uma nova funcionalidade (isto gera um incremento *minor* no versionamento).
- `fix: <descrição>` - Para corrigir um bug (isto gera um incremento *patch* no versionamento).
- `BREAKING CHANGE: <descrição>` - Para mudanças que quebram a compatibilidade da API (isto gera um incremento *major* no versionamento).

#### Exemplos de Commits

- **Adição de uma nova funcionalidade:**
  
  ```bash
  git commit -m "feat: adiciona funcionalidade de registro de usuários"
  ```

- **Correção de bug:**

  ```bash
  git commit -m "fix: corrige erro no login de usuários"
  ```

- **Mudança que quebra compatibilidade:**

  ```bash
  git commit -m "feat: refatora autenticação de usuários"
  # Corpo do commit:
  BREAKING CHANGE: refatoração da autenticação remove suporte ao método anterior de login
  ```

#### Como Funciona

1. Cada commit é analisado pelo `semantic-release` para determinar o tipo de incremento necessário no versionamento (`patch`, `minor` ou `major`).
2. Com base nos commits, a nova versão é gerada automaticamente.
3. O `semantic-release` cria uma *tag* correspondente no Git com a versão incrementada.
4. Essa tag é então publicada no repositório remoto (GitHub, GitLab, etc.), junto com as notas de release.


## Contribuição

Se você deseja contribuir para o projeto, siga estas etapas:

1. **Faça um Fork do Repositório.**
2. **Crie uma Branch para sua Alteração:**

    ```bash
    git checkout -b minha-alteracao
    ```

3. **Faça o Commit das Suas Alterações:**

    ```bash
    git commit -am 'Adiciona nova funcionalidade'
    ```

4. **Envie para o Repositório Remoto:**

    ```bash
    git push origin minha-alteracao
    ```

5. **Abra um Pull Request no GitHub.**

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

## Contato

Se você tiver dúvidas ou precisar de suporte, sinta-se à vontade para abrir uma issue no repositório ou entrar em contato diretamente.

**Autor:** Seu Nome  
**E-mail:** seu.email@dominio.com  
**GitHub:** [seu-usuario](https://github.com/seu-usuario)

