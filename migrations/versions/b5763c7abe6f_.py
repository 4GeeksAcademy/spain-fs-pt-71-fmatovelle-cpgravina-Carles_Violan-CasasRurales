"""empty message

Revision ID: b5763c7abe6f
Revises: f685f8a55929
Create Date: 2024-09-12 08:26:09.891445

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5763c7abe6f'
down_revision = 'f685f8a55929'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('house', schema=None) as batch_op:
        batch_op.add_column(sa.Column('city', sa.String(length=120), nullable=False))
        batch_op.create_unique_constraint(None, ['city'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('house', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('city')

    # ### end Alembic commands ###
