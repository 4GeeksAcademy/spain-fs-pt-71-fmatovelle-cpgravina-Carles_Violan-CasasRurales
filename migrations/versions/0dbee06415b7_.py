"""empty message

Revision ID: 0dbee06415b7
Revises: 0d6ec9ff9ae8
Create Date: 2024-09-10 10:29:41.861054

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0dbee06415b7'
down_revision = '0d6ec9ff9ae8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('house', schema=None) as batch_op:
        batch_op.drop_constraint('house_latitude_key', type_='unique')
        batch_op.drop_constraint('house_longitude_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('house', schema=None) as batch_op:
        batch_op.create_unique_constraint('house_longitude_key', ['longitude'])
        batch_op.create_unique_constraint('house_latitude_key', ['latitude'])

    # ### end Alembic commands ###