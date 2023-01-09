import { Box, Button, Img } from '@chakra-ui/react';

export const GoogleLoginButton = function () {
  return (
    <Box>
      <Button
        size="lg"
        width="full"
        maxW="md"
        borderRadius="full"
        bgColor="#4285f4"
        color="white"
        colorScheme="blue"
        leftIcon={<img src="/google.svg" alt="google 로고" style={{ backgroundColor: 'white', padding: '8px', borderRadius: '50%' }}/>}
      >
        Google 계정으로 시작하기
      </Button>
    </Box>
  );
};