"""empty message

Revision ID: 16afabc8758f
Revises: 0ec559709512
Create Date: 2024-08-30 10:49:05.720246

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '16afabc8758f'
down_revision = '0ec559709512'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reservations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('traveler_id', sa.Integer(), nullable=False),
    sa.Column('house_id', sa.Integer(), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['house_id'], ['house.id'], ),
    sa.ForeignKeyConstraint(['traveler_id'], ['traveler.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reservations')
    # ### end Alembic commands ###
