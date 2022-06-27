import { createStyles, Card, Group, Text, Grid, Skeleton } from '@mantine/core';

export const SkeletonItem = () => {
  const { classes } = useStyles();

  return (
    <Grid.Col sm={12} md={6} lg={4}>
      <Card withBorder p="lg" radius="md" className={classes.card}>
        <Card.Section mb="sm">
          <Skeleton height={180} />
        </Card.Section>

        <Skeleton height={20} width="20%" radius="xl" />
        <Skeleton height={20} radius="xl" mt="xs" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} width="70%" radius="xl" />

        <Group mt="lg">
          <Skeleton circle height={50} />
        </Group>

        <Card.Section className={classes.footer}>
          <Group position="apart">
            <Text size="xs" color="dimmed">
              {/* フッター */}
            </Text>
            <Skeleton height={30} width="50%" radius="xl" />
          </Group>
        </Card.Section>
      </Card>
    </Grid.Col>
  );
};

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));
