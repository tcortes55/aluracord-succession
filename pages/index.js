import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useState } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import constants from '../constants';

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.primary['100']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
        </>
    )
}

// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Title tag="h2">Boas vindas de volta!!</Title>
//             <div>Discord - Alura Matrix</div>
//         </div>
//     )
//   } 
// export default HomePage

export default function PaginaInicial() {
    const [username, setUsername] = useState('tcortes55');
    const routing = useRouter();
    const userApiUrl = 'https://api.github.com/users/'
  
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.neutrals[200],
            backgroundImage: `url(${constants.backgroundImageUrl})`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[600],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function(e) {
                e.preventDefault();
                console.log("submit");
                routing.push('/chat');
                // window.location.href = '/chat';
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Bem-vindo!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[100] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                value={username}
                onChange={function(e) {
                  setUsername(e.target.value);
                  fetch(userApiUrl + e.target.value).then((resp) => resp.json()).then(function(data) {
                    console.log(data.name);
                  })
                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[100],
                    mainColor: appConfig.theme.colors.neutrals[100],
                    mainColorHighlight: appConfig.theme.colors.primary[200],
                    backgroundColor: appConfig.theme.colors.primary['050'],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[700],
                  mainColor: appConfig.theme.colors.primary[100],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[800],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              {username.length > 2 && <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />}
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[100],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }