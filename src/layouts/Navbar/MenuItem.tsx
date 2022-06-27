import Link from 'next/link';
import { useRouter } from 'next/router';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

type Props = {
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
};

export const MenuItem = (props: Props) => {
  const { label, href, icon, color } = props;
  const router = useRouter();
  const activeColor = router.pathname === href ? 'teal' : '';

  return (
    <Link href={href} passHref>
      <a>
        <UnstyledButton
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <ThemeIcon size={35} color={color} variant="light">
              {icon}
            </ThemeIcon>
            <Text size="lg" weight="bold" color={activeColor}>
              {label}
            </Text>
          </Group>
        </UnstyledButton>
      </a>
    </Link>
  );
};
